import {
  BarChart3,
  Home,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";

export const buyerMenuSections = [
  {
    title: "General",
    items: [
      {
        name: "Home",
        path: "/",
        icon: Home,
        description: "Go to the marketplace home page",
      },
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: BarChart3,
        description: "View your account dashboard",
      },
      {
        name: "Profile",
        path: "/profile",
        icon: User,
        description: "Manage your profile settings",
      },
    ],
  },
  {
    title: "Marketplace",
    items: [
      {
        name: "Marketplace",
        path: "/marketplace",
        icon: ShoppingCart,
        description: "Browse available products",
      },
      {
        name: "Cart",
        path: "/cart",
        icon: ShoppingCart,
        description: "View your shopping cart",
      },
      {
        name: "Orders",
        path: "/orders",
        icon: ShoppingBag,
        description: "Track your order history",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        name: "Settings",
        path: "/settings",
        icon: Settings,
        description: "Configure your account preferences",
      },
    ],
  },
];

export const sellerMenuSections = [
  {
    title: "Dashboard",
    items: [
      {
        name: "Seller Dashboard", // Changed from "Analytics"
        path: "/seller/dashboard",
        icon: BarChart3,
        description: "View your sales metrics and performance"
      },
      {
        name: "Profile",
        path: "/seller/profile",
        icon: User,
        description: "Manage your seller profile and settings"
      },
      {
        name: "Products",
        path: "/seller/products",
        icon: Package,
        description: "Manage your product listings"
      },
      {
        name: "Orders",
        path: "/seller/orders",
        icon: ShoppingBag,
        description: "View and manage orders"
      },
    ]
  },
  {
    title: "Listings",
    items: [
      {
        name: "Add Item",
        path: "/items/add",
        icon: Package,
        description: "Add a new item for sale"
      },
    ]
  },
  {
    title: "Account",
    items: [
      {
        name: "Settings",
        path: "/settings",
        icon: Settings,
        description: "Configure your account preferences"
      },
    ]
  }
];

export const adminMenuItems = [
  {
    name: "User Management",
    path: "/admin/users",
    icon: Users,
    description: "Manage user accounts and roles",
  },
  {
    name: "Admin Panel",
    path: "/admin/panel",
    icon: Settings,
    description: "Access admin settings and configurations",
  },
];
