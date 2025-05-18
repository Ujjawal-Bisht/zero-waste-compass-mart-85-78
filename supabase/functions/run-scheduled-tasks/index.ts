
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TaskRequest {
  taskId?: string;
  taskType?: string;
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

    // Get the request data (optional)
    const { taskId, taskType } = await req.json().catch(() => ({} as TaskRequest));

    // Query to get tasks that should be run now
    const query = supabaseClient
      .from("scheduled_tasks")
      .select("*")
      .eq("enabled", true)
      .lte("next_run", new Date().toISOString());

    // Apply filters if provided
    if (taskId) {
      query.eq("id", taskId);
    }
    if (taskType) {
      query.eq("task_type", taskType);
    }

    // Get tasks to run
    const { data: tasksToRun, error } = await query;

    if (error) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }

    console.log(`Found ${tasksToRun.length} tasks to run`);

    const results = [];

    // Process each task
    for (const task of tasksToRun) {
      try {
        // Start task history record
        const { data: historyRecord } = await supabaseClient
          .from("task_history")
          .insert({
            task_id: task.id,
            status: "running",
          })
          .select()
          .single();

        // Execute the task based on its type
        let result;
        console.log(`Running task: ${task.name} (${task.task_type})`);

        switch (task.task_type) {
          case "update_product_prices":
            result = await handleDynamicPricingTask(supabaseClient, task);
            break;
          case "notify_expiring_items":
            result = await handleExpiringItemsNotification(supabaseClient, task);
            break;
          case "generate_reports":
            result = await handleReportGeneration(supabaseClient, task);
            break;
          default:
            result = `Unknown task type: ${task.task_type}`;
        }

        // Update task history
        await supabaseClient
          .from("task_history")
          .update({
            status: "completed",
            result: JSON.stringify(result),
            completed_at: new Date().toISOString(),
          })
          .eq("id", historyRecord.id);

        // Update the task's last run time and schedule next run
        const nextRunTime = calculateNextRunTime(task.schedule);
        await supabaseClient
          .from("scheduled_tasks")
          .update({
            last_run: new Date().toISOString(),
            next_run: nextRunTime,
          })
          .eq("id", task.id);

        results.push({
          taskId: task.id,
          taskName: task.name,
          status: "completed",
          result,
        });
      } catch (taskError) {
        console.error(`Error executing task ${task.name}:`, taskError);
        
        // Update task history with error
        await supabaseClient
          .from("task_history")
          .update({
            status: "failed",
            result: JSON.stringify({ error: taskError.message }),
            completed_at: new Date().toISOString(),
          })
          .eq("task_id", task.id);

        results.push({
          taskId: task.id,
          taskName: task.name,
          status: "failed",
          error: taskError.message,
        });
      }
    }

    return new Response(
      JSON.stringify({ results }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error running scheduled tasks:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});

// Handler for dynamic pricing task
async function handleDynamicPricingTask(supabase, task) {
  console.log("Running dynamic pricing task");
  
  // Get products with dynamic pricing enabled
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("dynamic_pricing_enabled", true);
  
  const updates = [];
  
  for (const product of products || []) {
    try {
      const newPrice = calculateDynamicPrice(product);
      
      // Update product price
      await supabase
        .from("products")
        .update({ price: newPrice })
        .eq("id", product.id);
      
      updates.push({
        productId: product.id,
        oldPrice: product.price,
        newPrice,
      });
    } catch (err) {
      console.error(`Error updating price for product ${product.id}:`, err);
    }
  }
  
  return {
    updatedProducts: updates.length,
    details: updates,
  };
}

// Helper function to calculate dynamic price
function calculateDynamicPrice(product) {
  // Basic algorithm: reduce price as expiry date approaches
  // In a real app, this would be more sophisticated
  const expiryDate = new Date(product.expiry_date || null);
  const now = new Date();
  
  if (!expiryDate || isNaN(expiryDate.getTime())) {
    return product.price; // No change if no valid expiry date
  }
  
  const daysUntilExpiry = Math.max(0, Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24)));
  const originalPrice = product.original_price || product.price;
  
  // Simple linear reduction based on days until expiry
  if (daysUntilExpiry <= 30) {
    const discount = Math.min(0.7, (30 - daysUntilExpiry) / 30 * 0.7); // Max 70% discount
    return Math.round((originalPrice * (1 - discount)) * 100) / 100;
  }
  
  return product.price; // No change if more than 30 days until expiry
}

// Handler for expiring items notification
async function handleExpiringItemsNotification(supabase, task) {
  console.log("Running expiring items notification task");
  
  const daysThreshold = (task.parameters?.days_threshold) || 7;
  const now = new Date();
  const thresholdDate = new Date(now);
  thresholdDate.setDate(now.getDate() + daysThreshold);
  
  // Get items expiring soon
  const { data: expiringItems } = await supabase
    .from("products")
    .select("id, name, expiry_date, seller_id")
    .lt("expiry_date", thresholdDate.toISOString())
    .gt("expiry_date", now.toISOString());
  
  console.log(`Found ${expiringItems?.length || 0} items expiring within ${daysThreshold} days`);
  
  // Get unique seller IDs
  const sellerIds = [...new Set(expiringItems?.map(item => item.seller_id) || [])];
  
  // Get seller emails
  const { data: sellers } = await supabase
    .from("profiles")
    .select("id, email")
    .in("id", sellerIds);
  
  const sellerEmailMap = {};
  sellers?.forEach(seller => {
    sellerEmailMap[seller.id] = seller.email;
  });
  
  const notificationsSent = [];
  
  // Create notifications for each seller
  for (const sellerId of sellerIds) {
    const sellerItems = expiringItems?.filter(item => item.seller_id === sellerId) || [];
    
    // Skip if no items for this seller
    if (sellerItems.length === 0) continue;
    
    // Create a notification in the database
    const { data: notification } = await supabase
      .from("notifications")
      .insert({
        user_id: sellerId,
        type: "warning",
        title: "Products Expiring Soon",
        message: `You have ${sellerItems.length} products expiring within the next ${daysThreshold} days.`,
        is_read: false,
      })
      .select()
      .single();
    
    notificationsSent.push({
      sellerId,
      notificationId: notification?.id,
      itemCount: sellerItems.length,
    });
  }
  
  return {
    expiringItemCount: expiringItems?.length || 0,
    notificationsSent,
  };
}

// Handler for report generation task
async function handleReportGeneration(supabase, task) {
  console.log("Running report generation task");
  
  const reportType = task.parameters?.report_type || "sales";
  const result = { reportType };
  
  switch (reportType) {
    case "sales":
      // Generate sales report
      result.data = await generateSalesReport(supabase);
      break;
    case "inventory":
      // Generate inventory report
      result.data = await generateInventoryReport(supabase);
      break;
    default:
      throw new Error(`Unknown report type: ${reportType}`);
  }
  
  // In a real application, you might store the report in a database table
  // or upload it to storage, then notify users it's ready
  
  return result;
}

// Helper function to generate sales report
async function generateSalesReport(supabase) {
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id,
      total_amount,
      status,
      created_at,
      buyer_id,
      order_items (
        product_id,
        quantity,
        unit_price,
        seller_id
      )
    `)
    .order("created_at", { ascending: false })
    .limit(100);
  
  // Process the data to generate sales metrics
  // In a real app, you'd do more sophisticated analysis
  const totalSales = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
  const orderCount = orders?.length || 0;
  
  return {
    totalSales,
    orderCount,
    averageOrderValue: orderCount > 0 ? (totalSales / orderCount).toFixed(2) : 0,
    period: "Last 100 orders",
    generatedAt: new Date().toISOString(),
  };
}

// Helper function to generate inventory report
async function generateInventoryReport(supabase) {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("stock_quantity", { ascending: true })
    .limit(100);
  
  // Calculate inventory metrics
  const lowStockThreshold = 5;
  const lowStockItems = products?.filter(p => p.stock_quantity <= lowStockThreshold) || [];
  const totalInventoryValue = products?.reduce((sum, product) => 
    sum + (product.price * product.stock_quantity), 0) || 0;
  
  return {
    totalProducts: products?.length || 0,
    lowStockItems: lowStockItems.length,
    totalInventoryValue,
    generatedAt: new Date().toISOString(),
  };
}

// Helper function to calculate next run time based on schedule
function calculateNextRunTime(schedule) {
  // This is a simplified scheduler - in a production app you'd use a more robust solution
  // Format: '1h', '30m', '1d', '7d', etc.
  const unit = schedule.slice(-1);
  const value = parseInt(schedule.slice(0, -1));
  
  if (isNaN(value)) {
    throw new Error(`Invalid schedule format: ${schedule}`);
  }
  
  const now = new Date();
  
  switch (unit) {
    case 'm': // minutes
      now.setMinutes(now.getMinutes() + value);
      break;
    case 'h': // hours
      now.setHours(now.getHours() + value);
      break;
    case 'd': // days
      now.setDate(now.getDate() + value);
      break;
    default:
      throw new Error(`Unknown time unit: ${unit}`);
  }
  
  return now.toISOString();
}
