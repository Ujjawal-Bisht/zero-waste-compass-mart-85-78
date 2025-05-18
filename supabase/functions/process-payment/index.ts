
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from 'npm:stripe@13.6.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: '2022-11-15',
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  currency: string;
  orderId?: string;
  userId?: string;
  paymentMethod: string;
  email: string;
  description: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Get the request data
    const { 
      amount, 
      currency = "inr", 
      orderId, 
      userId, 
      paymentMethod,
      email,
      description 
    } = await req.json() as PaymentRequest;

    if (!amount || !paymentMethod || !email) {
      return new Response(
        JSON.stringify({ error: "Amount, payment method, and email are required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents/paise
      currency,
      payment_method_types: [paymentMethod],
      receipt_email: email,
      description,
      metadata: {
        orderId,
        userId,
      },
    });

    // Store the payment information in the database
    const { data: paymentRecord, error } = await supabaseClient
      .from("payments")
      .insert({
        amount,
        currency,
        order_id: orderId,
        user_id: userId,
        payment_method: paymentMethod,
        payment_status: "pending",
        transaction_id: paymentIntent.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Error recording payment:", error);
    }

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        paymentId: paymentRecord?.id,
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
