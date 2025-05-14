
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Item } from '@/types';

interface StatusCardsProps {
  items: Item[];
}

const StatusCards: React.FC<StatusCardsProps> = ({ items }) => {
  // Calculate items expiring within 7 days
  const expiringItems = items.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{items.length}</div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Available Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {items.filter(item => item.status === 'available').length}
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Donated Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {items.filter(item => item.status === 'donated').length}
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Expiring Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiringItems}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCards;
