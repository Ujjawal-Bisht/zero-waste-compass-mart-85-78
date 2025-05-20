
import React from 'react';
import {
  Home,
  Store,
  ShoppingCart,
  Box,
  MessageSquare,
  Settings,
  LineChart,
  Shield,
  User,
  Heart,
  Tag,
  MoreHorizontal,
  Star,
  Users
} from 'lucide-react';
import { MenuSection, NavItemType } from './types';

// Buyer menu sections with organization and additional categories
export const buyerMenuSections: MenuSection[] = [
  {
    title: "Main Navigation",
    items: [
      { path: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
      { path: "/marketplace", icon: <Store size={18} />, label: "Marketplace", highlight: true },
      { path: "/orders", icon: <Box size={18} />, label: "My Orders" },
    ]
  },
  {
    title: "Shopping",
    items: [
      { path: "/cart", icon: <ShoppingCart size={18} />, label: "Shopping Cart" },
      { path: "/favorites", icon: <Heart size={18} />, label: "Saved Items" },
      { path: "/deals", icon: <Tag size={18} />, label: "Special Deals" },
    ]
  },
  {
    title: "User",
    items: [
      { path: "/profile", icon: <User size={18} />, label: "My Profile" },
      { path: "/settings", icon: <Settings size={18} />, label: "Settings" },
    ]
  },
  {
    title: "More Options",
    items: [
      { path: "/chat", icon: <MessageSquare size={18} />, label: "Support Chat" },
      { path: "/community", icon: <Users size={18} />, label: "Community" },
      { path: "/advanced-features", icon: <Star size={18} />, label: "Premium Features", highlight: true },
    ]
  },
];

export const sellerMenuSections: MenuSection[] = [
  {
    title: "Seller Dashboard",
    items: [
      { path: "/seller/dashboard", icon: <LineChart size={18} />, label: "Analytics" },
      { path: "/seller/products", icon: <Box size={18} />, label: "Products" },
      { path: "/seller/orders", icon: <ShoppingCart size={18} />, label: "Orders" },
      { path: "/seller/profile", icon: <Settings size={18} />, label: "Seller Profile" },
    ]
  }
];

export const adminMenuItems: NavItemType[] = [
  { path: "/admin/panel", icon: <Shield size={18} />, label: "Admin Panel" }
];
