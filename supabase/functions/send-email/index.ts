
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  templateName: string;
  to: string;
  data: Record<string, string>;
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
    const { templateName, to, data } = await req.json() as EmailRequest;

    if (!templateName || !to) {
      return new Response(
        JSON.stringify({ error: "Template name and recipient email are required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Fetch the email template
    const { data: template, error } = await supabaseClient
      .from("email_templates")
      .select("*")
      .eq("name", templateName)
      .single();

    if (error || !template) {
      return new Response(
        JSON.stringify({ error: "Email template not found" }),
        { 
          status: 404, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Process template - replace variables with actual data
    let htmlContent = template.body;
    let subject = template.subject;

    // Replace placeholders in the template
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, "g");
      htmlContent = htmlContent.replace(placeholder, value);
      subject = subject.replace(placeholder, value);
    });

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "ZeroWasteMart <notifications@zerowaste-compass-mart.com>",
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify(emailResponse),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
