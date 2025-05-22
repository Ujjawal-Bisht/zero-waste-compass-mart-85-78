
import { Package, ShoppingCart, IndianRupee, Users, PillBottle, Leaf, Home, Coffee, ShoppingBag, Sun, Wind, Recycle } from 'lucide-react';
import React from 'react';
import { User } from '@/types';

export const generateSellerStats = (currentUser: User | null) => {
  return [
    {
      title: "Active Products",
      value: "12",
      icon: <Package className="h-8 w-8 text-muted-foreground icon-float" />,
      description: "Products currently listed"
    },
    {
      title: "Pending Orders",
      value: "3",
      icon: <ShoppingCart className="h-8 w-8 text-muted-foreground icon-float" />,
      description: "Orders awaiting fulfillment"
    },
    {
      title: "Total Sales",
      value: "₹12,400",
      icon: <IndianRupee className="h-8 w-8 text-muted-foreground icon-float" />,
      description: "Revenue this month"
    },
    {
      title: "Trust Score",
      value: currentUser?.trustScore?.toFixed(1) || "0.0",
      icon: <Users className="h-8 w-8 text-muted-foreground icon-float" />,
      description: `${currentUser?.verified ? "Verified seller" : "Pending verification"}`
    }
  ];
};

export const generateCategoryStats = () => {
  return [
    {
      title: "Packaged Food",
      value: "8",
      icon: <Package className="h-8 w-8 text-zwm-accent icon-float" />,
      description: "Food items listed"
    },
    {
      title: "Healthcare Items",
      value: "4",
      icon: <PillBottle className="h-8 w-8 text-zwm-primary icon-float" />,
      description: "Healthcare items listed"
    },
    {
      title: "Eco-Friendly Products",
      value: "5",
      icon: <Leaf className="h-8 w-8 text-green-500 icon-float" />,
      description: "Sustainable products"
    },
    {
      title: "Home Essentials",
      value: "6",
      icon: <Home className="h-8 w-8 text-amber-500 icon-float" />,
      description: "Home and kitchen items"
    },
    {
      title: "Reusable Items",
      value: "3",
      icon: <Recycle className="h-8 w-8 text-blue-500 icon-float" />,
      description: "Reusable alternatives"
    },
    {
      title: "Organic Products",
      value: "2",
      icon: <Sun className="h-8 w-8 text-orange-500 icon-float" />,
      description: "Certified organic items"
    }
  ];
};
