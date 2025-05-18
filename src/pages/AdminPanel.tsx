import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Item } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-end gap-4">
        <Link to={`/items/${row.id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    ),
  },
];

const flaggedItems = [
  {
    id: "flag1",
    name: "Flagged Eggs",
    description: "Past expiry.",
    category: "other",
    imageUrl: "/images/eggs.jpg",
    expiryDate: "2025-04-29",
    createdAt: "2025-03-27",
    updatedAt: "2025-03-30",
    status: "flagged",
    userId: "456",
    userName: "John",
    userPhoto: null,
    location: {
      address: "789 Farm Rd",
      lat: 0,
      lng: 0,
    },
    quantity: 5,
    currentPrice: 2.0,
  },
  {
    id: "flag2",
    name: "Wilted Lettuce",
    description: "Looks sad.",
    category: "food",
    imageUrl: "/images/lettuce.jpg",
    expiryDate: "2025-04-29",
    createdAt: "2025-03-27",
    updatedAt: "2025-03-30",
    status: "flagged",
    userId: "456",
    userName: "John",
    userPhoto: null,
    location: {
      address: "789 Farm Rd",
      lat: 0,
      lng: 0,
    },
    quantity: 5,
    currentPrice: 2.0,
  },
  {
    id: "flag3",
    name: "Expired Milk",
    description: "Smells funny.",
    category: "food",
    imageUrl: "/images/milk.jpg",
    expiryDate: "2025-04-29",
    createdAt: "2025-03-27",
    updatedAt: "2025-03-30",
    status: "flagged",
    userId: "456",
    userName: "John",
    userPhoto: null,
    location: {
      address: "789 Farm Rd",
      lat: 0,
      lng: 0,
    },
    quantity: 5,
    currentPrice: 2.0,
  },
];

const AdminPanel: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Flagged Items</h2>
          <DataTable columns={columns} data={flaggedItems} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
