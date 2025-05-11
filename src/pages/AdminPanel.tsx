
import React, { useState } from 'react';
import { Item, ItemStatus } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for flagged items
const mockFlaggedItems: Item[] = [
  {
    id: '101',
    name: 'Suspicious Item 1',
    description: 'This item may not be appropriate for donation',
    category: 'other',
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&q=80&w=2570&ixlib=rb-4.0.3',
    expiryDate: '2025-05-20',
    createdAt: '2025-05-01',
    updatedAt: '2025-05-05',
    status: 'flagged',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '123 Main St, City',
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: '102',
    name: 'Suspicious Item 2',
    description: 'This item has been reported multiple times',
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2501&ixlib=rb-4.0.3',
    expiryDate: '2025-06-15',
    createdAt: '2025-05-02',
    updatedAt: '2025-05-06',
    status: 'flagged',
    userId: 'user456',
    userName: 'Jane Smith',
    userPhoto: null,
    location: {
      address: '456 Oak St, City',
      lat: 40.7129,
      lng: -74.007,
    },
  },
];

// Mock data for platform stats
const mockStats = {
  totalUsers: 125,
  totalItems: 347,
  activeItems: 189,
  donatedItems: 98,
  flaggedItems: 14,
  newUsersToday: 8,
  newItemsToday: 15,
};

// Mock data for recent users
const mockUsers = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joinedAt: '2025-05-10',
    itemsCount: 5,
  },
  {
    id: 'user2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    joinedAt: '2025-05-09',
    itemsCount: 3,
  },
  {
    id: 'user3',
    name: 'Sam Wilson',
    email: 'sam@example.com',
    joinedAt: '2025-05-08',
    itemsCount: 7,
  },
  {
    id: 'user4',
    name: 'Lena Kim',
    email: 'lena@example.com',
    joinedAt: '2025-05-07',
    itemsCount: 2,
  },
];

const AdminPanel: React.FC = () => {
  const [flaggedItems, setFlaggedItems] = useState(mockFlaggedItems);

  const handleApproveItem = (itemId: string) => {
    setFlaggedItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast.success('Item approved and restored to marketplace');
  };

  const handleRemoveItem = (itemId: string) => {
    setFlaggedItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast.success('Item removed from platform');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{mockStats.newUsersToday} today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              +{mockStats.newItemsToday} today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeItems}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockStats.activeItems / mockStats.totalItems) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.donatedItems}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockStats.donatedItems / mockStats.totalItems) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="flagged" className="w-full">
        <TabsList>
          <TabsTrigger value="flagged">Flagged Items</TabsTrigger>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
        </TabsList>
        <TabsContent value="flagged" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Items</CardTitle>
              <CardDescription>
                Review and take action on items that have been flagged by users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {flaggedItems.length === 0 ? (
                <div className="text-center py-6">
                  <p>No flagged items to review</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {flaggedItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                      <div className="md:w-1/4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="rounded-md w-full h-32 object-cover"
                        />
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm">
                                <span className="font-medium">Category:</span>{' '}
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Listed by:</span> {item.userName}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Posted on:</span> {formatDate(item.createdAt)}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Location:</span> {item.location.address}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-red-50 text-red-600 mt-2 md:mt-0">
                            Flagged
                          </Badge>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => handleApproveItem(item.id)}
                          >
                            Approve Item
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Remove Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                Review recently joined users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Joined</p>
                        <p className="text-sm text-muted-foreground">{formatDate(user.joinedAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Items</p>
                        <p className="text-sm text-muted-foreground">{user.itemsCount}</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
