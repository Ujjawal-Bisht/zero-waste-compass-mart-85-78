
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemsTable from './ItemsTable';
import Pagination from './Pagination';
import { Item, ItemStatus } from '@/types';

interface ItemTabsProps {
  items: Item[];
  selectedStatus: ItemStatus | 'all';
  currentPage: number;
  totalPages: number;
  getStatusClass: (status: ItemStatus) => string;
  formatDate: (dateString: string) => string;
  getCategoryText: (category: string) => string;
  onStatusChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onView: (item: Item) => void;
  onEdit: (item: Item) => void;
}

const ItemTabs: React.FC<ItemTabsProps> = ({
  items,
  selectedStatus,
  currentPage,
  totalPages,
  getStatusClass,
  formatDate,
  getCategoryText,
  onStatusChange,
  onPageChange,
  onView,
  onEdit
}) => {
  return (
    <Tabs defaultValue="all" className="w-full animate-fade-in" style={{ animationDelay: "400ms" }} onValueChange={onStatusChange}>
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="donated">Donated</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="all" className="mt-6">
        <ItemsTable 
          items={items} 
          getStatusClass={getStatusClass} 
          formatDate={formatDate}
          getCategoryText={getCategoryText} 
          onView={onView}
          onEdit={onEdit}
        />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      </TabsContent>
      <TabsContent value="available" className="mt-6">
        <ItemsTable 
          items={items}
          getStatusClass={getStatusClass} 
          formatDate={formatDate}
          getCategoryText={getCategoryText}
          onView={onView}
          onEdit={onEdit}
        />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      </TabsContent>
      <TabsContent value="donated" className="mt-6">
        <ItemsTable 
          items={items}
          getStatusClass={getStatusClass} 
          formatDate={formatDate}
          getCategoryText={getCategoryText}
          onView={onView}
          onEdit={onEdit}
        />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      </TabsContent>
      <TabsContent value="expired" className="mt-6">
        <ItemsTable 
          items={items}
          getStatusClass={getStatusClass} 
          formatDate={formatDate}
          getCategoryText={getCategoryText}
          onView={onView}
          onEdit={onEdit}
        />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ItemTabs;
