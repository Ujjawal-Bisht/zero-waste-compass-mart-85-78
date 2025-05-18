
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from 'npm:stripe@13.6.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: '2022-11-15',
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

serve(async (req: Request) => {
  if (req.method === "POST") {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response("Missing stripe-signature header", { status: 400 });
    }

    let event;
    try {
      const body = await req.text();
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    try {
      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object;
          console.log(`PaymentIntent ${paymentIntent.id} succeeded`);

          // Update payment record
          await supabaseClient
            .from("payments")
            .update({
              payment_status: "paid",
              updated_at: new Date().toISOString()
            })
            .eq("transaction_id", paymentIntent.id);

          // Check if this payment is for an order
          if (paymentIntent.metadata?.orderId) {
            // Update order status
            await supabaseClient
              .from("orders")
              .update({
                status: "processing",
                updated_at: new Date().toISOString()
              })
              .eq("id", paymentIntent.metadata.orderId);

            // Send confirmation email
            if (paymentIntent.receipt_email) {
              await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-email`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`
                },
                body: JSON.stringify({
                  templateName: "order_confirmation",
                  to: paymentIntent.receipt_email,
                  data: {
                    order_id: paymentIntent.metadata.orderId
                  }
                })
              });
            }
          }
          break;
        }
        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object;
          console.log(`PaymentIntent ${paymentIntent.id} failed`);

          // Update payment record
          await supabaseClient
            .from("payments")
            .update({
              payment_status: "failed",
              updated_at: new Date().toISOString()
            })
            .eq("transaction_id", paymentIntent.id);
          break;
        }
        case 'charge.refunded': {
          const charge = event.data.object;
          console.log(`Charge ${charge.id} refunded`);
          
          // Find the payment by transaction ID
          const { data: payment } = await supabaseClient
            .from("payments")
            .select("id, order_id")
            .eq("transaction_id", charge.payment_intent)
            .single();
            
          if (payment) {
            // Update payment record
            await supabaseClient
              .from("payments")
              .update({
                payment_status: "refunded",
                updated_at: new Date().toISOString()
              })
              .eq("id", payment.id);
              
            // If there's an order, update its status
            if (payment.order_id) {
              await supabaseClient
                .from("orders")
                .update({
                  status: "cancelled",
                  updated_at: new Date().toISOString()
                })
                .eq("id", payment.order_id);
            }
          }
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      console.error(`Error processing webhook event: ${err.message}`);
      return new Response(`Webhook processing error: ${err.message}`, { status: 500 });
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
});
