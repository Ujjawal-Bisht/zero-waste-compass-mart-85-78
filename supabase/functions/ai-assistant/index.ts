
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AIRequest {
  query: string;
  context?: string;
  userId?: string;
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
    const { query, context, userId } = await req.json() as AIRequest;
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    // This is a simplified mock AI response for now
    // In a production environment, you would call an actual AI API like OpenAI
    const mockResponse = {
      response: `AI response to: "${query}"`,
      suggestions: [
        "How can I reduce waste in my kitchen?",
        "Tell me about sustainable packaging",
        "What products are on sale?"
      ],
      timestamp: new Date().toISOString()
    };

    // Save the user query and response in history if userId is provided
    if (userId) {
      await supabaseClient.from("ai_interactions").insert({
        user_id: userId,
        query,
        response: mockResponse.response,
        context,
      }).select();
    }

    // Return the response
    return new Response(
      JSON.stringify(mockResponse),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error processing AI request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
