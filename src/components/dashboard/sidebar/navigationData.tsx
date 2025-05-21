
import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart,
  Home, 
  User, 
  Package, 
  ShoppingBag, 
  Settings, 
  BarChart4, 
  Users, 
  Shield
} from 'lucide-react';
import { MenuSection, NavItemType } from './types';

export const buyerMenuSections: MenuSection[] = [
  {
    title: "General",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard size={18} />,
        description: "Overview of your account"
      },
      {
        label: "Marketplace",
        path: "/marketplace",
        icon: <ShoppingBag size={18} />,
        description: "Browse available items"
      },
      {
        label: "My Orders",
        path: "/orders",
        icon: <Package size={18} />,
        description: "View your order history"
      }
    ]
  },
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        path: "/profile",
        icon: <User size={18} />,
        description: "Manage your account details"
      },
      {
        label: "Cart",
        path: "/cart",
        icon: <ShoppingCart size={18} />,
        description: "View your shopping cart",
        highlight: true
      },
      {
        label: "Settings",
        path: "/settings",
        icon: <Settings size={18} />,
        description: "Change your preferences"
      }
    ]
  }
];

export const sellerMenuSections: MenuSection[] = [
  {
    title: "Seller Portal",
    items: [
      {
        label: "Dashboard",
        path: "/seller/dashboard",
        icon: <LayoutDashboard size={18} />,
        description: "Seller overview"
      },
      {
        label: "Products",
        path: "/seller/products",
        icon: <ShoppingBag size={18} />,
        description: "Manage your items"
      },
      {
        label: "Orders",
        path: "/seller/orders",
        icon: <Package size={18} />,
        description: "View customer orders"
      },
      {
        label: "Analytics",
        path: "/seller/analytics",
        icon: <BarChart4 size={18} />,
        description: "View sales performance"
      }
    ]
  },
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        path: "/seller/profile",
        icon: <User size={18} />,
        description: "Manage seller profile"
      },
      {
        label: "Settings",
        path: "/settings",
        icon: <Settings size={18} />,
        description: "Change preferences"
      }
    ]
  }
];

export const adminMenuItems: NavItemType[] = [
  {
    label: "Admin Panel",
    path: "/admin/panel",
    icon: <Shield size={18} />,
    description: "Access admin controls"
  },
  {
    label: "User Management",
    path: "/admin/users",
    icon: <Users size={18} />,
    description: "Manage user accounts"
  }
];
