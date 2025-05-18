
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { mockItems } from '@/data/mockData'; // <-- changed this line to named import
import { Item, ItemStatus } from '@/types';

// Dashboard Components
import StatusCards from '@/components/dashboard/dashboard-components/StatusCards';
import DashboardHeader from '@/components/dashboard/dashboard-components/DashboardHeader';
import ItemTabs from '@/components/dashboard/dashboard-components/ItemTabs';
import { getStatusClass, formatDate, getCategoryText } from '@/components/dashboard/dashboard-components/dashboardUtils';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
        item.description.toLowerCase().includes(query) ||
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

  // Handler to navigate to item "view" page
  const handleView = (item: Item) => {
    navigate(`/items/${item.id}`);
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
