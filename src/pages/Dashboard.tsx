import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Item, ItemCategory, ItemStatus } from '@/types';
import { useAuth } from '@/contexts/auth/use-auth';

// Dashboard Components
import StatusCards from '@/components/dashboard/dashboard-components/StatusCards';
import DashboardHeader from '@/components/dashboard/dashboard-components/DashboardHeader';
import ItemTabs from '@/components/dashboard/dashboard-components/ItemTabs';
import { getStatusClass, formatDate, getCategoryText } from '@/components/dashboard/dashboard-components/dashboardUtils';

// Mock items with proper types
const mockItems: Item[] = [
  {
    id: "item1",
    name: "Organic Apples",
    description: "Fresh organic apples.",
    category: "food",
    imageUrl: "/images/apples.jpg",
    expiryDate: "2025-06-01",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-01",
    status: "available",
    userId: "123",
    userName: "Organic Farm",
    userPhoto: null,
    location: {
      address: "123 Farm Rd",
      lat: 0,
      lng: 0,
    },
    quantity: 10,
    currentPrice: 5.0,
  },
  {
    id: "item2",
    name: "Eggs",
    description: "Farm fresh eggs.",
    category: "food",
    imageUrl: "/images/eggs.jpg",
    expiryDate: "2025-04-29",
    createdAt: "2025-03-27",
    updatedAt: "2025-03-30",
    status: "sold",
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
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { currentUser } = useAuth();

  const filterItems = (items: Item[]) => {
    // Filter by status if not 'all'
    const statusFiltered = selectedStatus === 'all' 
      ? items 
      : items.filter(item => item.status === selectedStatus);
    
    // Filter by search query
    if (!searchQuery) return statusFiltered;
    
    const query = searchQuery.toLowerCase();
    return statusFiltered.filter(
      item => 
        item.name.toLowerCase().includes(query) || 
        (item.description?.toLowerCase().includes(query) || false) ||
        item.category.toLowerCase().includes(query)
    );
  };

  const filteredItems = filterItems(mockItems);
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handler to navigate to item "view" page (with buyer redirect)
  const handleView = (item: Item) => {
    if (currentUser && !currentUser.isSeller) {
      // If buyer, redirect to marketplace
      navigate('/marketplace');
    } else {
      // Seller or unknown, go to item detail
      navigate(`/items/${item.id}`);
    }
  };

  // Handler to navigate to item "edit" page
  const handleEdit = (item: Item) => {
    navigate(`/items/edit/${item.id}`);
  };

  // Handler for status tab change
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as ItemStatus | 'all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatusCards items={mockItems} />

      <ItemTabs
        items={currentItems}
        selectedStatus={selectedStatus}
        currentPage={currentPage}
        totalPages={totalPages}
        getStatusClass={getStatusClass}
        formatDate={formatDate}
        getCategoryText={getCategoryText}
        onStatusChange={handleStatusChange}
        onPageChange={handlePageChange}
        onView={handleView}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Dashboard;
