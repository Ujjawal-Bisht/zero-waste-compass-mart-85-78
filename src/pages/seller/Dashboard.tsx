
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

const SellerDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const stats = [
    {
      title: "Active Products",
      value: "12",
      icon: <Package className="h-8 w-8 text-muted-foreground" />,
      description: "Products currently listed"
    },
    {
      title: "Pending Orders",
      value: "3",
      icon: <ShoppingCart className="h-8 w-8 text-muted-foreground" />,
      description: "Orders awaiting fulfillment"
    },
    {
      title: "Total Sales",
      value: "$1,240",
      icon: <TrendingUp className="h-8 w-8 text-muted-foreground" />,
      description: "Revenue this month"
    },
    {
      title: "Trust Score",
      value: currentUser?.trustScore?.toFixed(1) || "0.0",
      icon: <Users className="h-8 w-8 text-muted-foreground" />,
      description: `${currentUser?.verified ? "Verified seller" : "Pending verification"}`
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser?.businessName || currentUser?.displayName}</h2>
        <p className="text-muted-foreground">
          Manage your products, orders and seller profile from here.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Your most recent customer orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No orders yet. When customers purchase your products, they'll appear here.
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Seller Performance</CardTitle>
            <CardDescription>
              Your trust score and metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Trust Score</div>
                  <div className="text-sm font-medium">
                    {currentUser?.trustScore?.toFixed(1) || "0.0"}/5.0
                  </div>
                </div>
                <div className="mt-1 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-zwm-primary" 
                    style={{ width: `${((currentUser?.trustScore || 0) / 5) * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium">
                  {currentUser?.verified 
                    ? "✓ Your seller account is verified" 
                    : "⚠️ Complete verification to improve your trust score"}
                </div>
                {!currentUser?.verified && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload business documentation to get verified and increase your visibility.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
