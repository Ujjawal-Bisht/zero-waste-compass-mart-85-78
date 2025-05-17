
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication Context
import { AuthProvider } from "./contexts/auth";

// Pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddItem from "./pages/items/AddItem";
import MyOrders from "./pages/orders/MyOrders";
import Cart from "./pages/cart/Cart";

// Seller Pages
import SellerDashboard from "./pages/seller/Dashboard";
import SellerProducts from "./pages/seller/Products";
import SellerOrders from "./pages/seller/Orders";
import SellerProfile from "./pages/seller/Profile";

// Layout
import DashboardLayout from "./components/layouts/DashboardLayout";
import AuthLayout from "./components/layouts/AuthLayout";

// Utility Components
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";
import SellerRoute from "./components/auth/SellerRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            
            {/* Protected Dashboard Routes */}
            <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Only show Add Item for sellers */}
              <Route path="/items/add" element={
                <SellerRoute>
                  <AddItem />
                </SellerRoute>
              } />
              
              {/* Seller Routes */}
              <Route path="/seller/*" element={
                <SellerRoute>
                  <Routes>
                    <Route path="dashboard" element={<SellerDashboard />} />
                    <Route path="products" element={<SellerProducts />} />
                    <Route path="orders" element={<SellerOrders />} />
                    <Route path="profile" element={<SellerProfile />} />
                  </Routes>
                </SellerRoute>
              } />
            </Route>
            
            {/* Admin Routes */}
            <Route element={<AdminRoute><DashboardLayout /></AdminRoute>}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
