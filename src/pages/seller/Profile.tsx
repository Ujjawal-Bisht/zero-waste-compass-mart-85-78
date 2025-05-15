
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileFormTab from '@/components/seller/ProfileFormTab';
import StatisticsTab from '@/components/seller/StatisticsTab';
import RecentItemsTab from '@/components/seller/RecentItemsTab';
import SellerMenuBar from '@/components/seller/SellerMenuBar';

const Profile = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
        Seller Profile
      </h1>

      <SellerMenuBar />

      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Manage Your Profile
          </h2>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 grid grid-cols-3 rounded-none">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="recent">Recent Items</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="px-6 py-4">
              <ProfileFormTab />
            </TabsContent>
            <TabsContent value="statistics" className="px-6 py-4">
              <StatisticsTab />
            </TabsContent>
            <TabsContent value="recent" className="px-6 py-4">
              <RecentItemsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
