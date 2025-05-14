import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemStatus, Item } from '@/types';
import { IndianRupee } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Extended mock data for dashboard (100+ entries)
const mockItems: Item[] = [
  {
    id: '1',
    name: 'Canned Vegetables',
    description: 'Unopened canned vegetables, expiring soon',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1597113366853-1d22fb824e8a?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    expiryDate: '2025-05-20',
    createdAt: '2025-05-01',
    updatedAt: '2025-05-01',
    status: 'available',
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
    id: '2',
    name: 'Bread',
    description: 'Fresh bread from local bakery',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    expiryDate: '2025-05-14',
    createdAt: '2025-05-02',
    updatedAt: '2025-05-02',
    status: 'available',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '456 Oak St, City',
      lat: 40.7129,
      lng: -74.007,
    },
  },
  {
    id: '3',
    name: 'Winter Jacket',
    description: 'Barely used winter jacket, size L',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&q=80&w=2565&ixlib=rb-4.0.3',
    expiryDate: '2025-12-31',
    createdAt: '2025-05-03',
    updatedAt: '2025-05-03',
    status: 'donated',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '789 Pine St, City',
      lat: 40.713,
      lng: -74.008,
    },
  },
  {
    id: '4',
    name: 'Rice (10kg)',
    description: 'Unopened bag of rice',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=2530&ixlib=rb-4.0.3',
    expiryDate: '2025-09-15',
    createdAt: '2025-05-04',
    updatedAt: '2025-05-04',
    status: 'available',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '101 Elm St, City',
      lat: 40.7131,
      lng: -74.009,
    },
  },
  {
    id: '5',
    name: 'Table Lamp',
    description: 'Working table lamp, no longer needed',
    category: 'household',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    expiryDate: '2025-12-31',
    createdAt: '2025-05-05',
    updatedAt: '2025-05-05',
    status: 'expired',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '202 Cedar St, City',
      lat: 40.7132,
      lng: -74.01,
    },
  },
];

// Generate additional mock items (for a total of 100+ entries)
for (let i = 6; i <= 105; i++) {
  const categories = ['food', 'household', 'medicine', 'clothing'] as const;
  const statuses = ['available', 'donated', 'expired', 'flagged'] as const;
  const category = categories[Math.floor(Math.random() * categories.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Generate random expiration date (between today and 6 months from now)
  const today = new Date();
  const futureDate = new Date();
  futureDate.setMonth(today.getMonth() + 6);
  const expiryDate = new Date(
    today.getTime() + Math.random() * (futureDate.getTime() - today.getTime())
  ).toISOString().split('T')[0];
  
  // Generate random creation date (between 3 months ago and today)
  const pastDate = new Date();
  pastDate.setMonth(today.getMonth() - 3);
  const createdAt = new Date(
    pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime())
  ).toISOString().split('T')[0];
  
  // Generate random price data
  const originalPrice = Math.floor(Math.random() * 5000) + 100; // Between ₹100 - ₹5000
  const discountPercent = Math.random() < 0.7 ? Math.floor(Math.random() * 50) + 5 : 0; // 70% chance of discount (5-50%)
  const currentPrice = discountPercent > 0 
    ? Math.floor(originalPrice * (1 - discountPercent / 100)) 
    : originalPrice;

  const locations = [
    { address: 'Mumbai, Maharashtra', lat: 19.0760, lng: 72.8777 },
    { address: 'Delhi, Delhi', lat: 28.6139, lng: 77.2090 },
    { address: 'Bangalore, Karnataka', lat: 12.9716, lng: 77.5946 },
    { address: 'Hyderabad, Telangana', lat: 17.3850, lng: 78.4867 },
    { address: 'Chennai, Tamil Nadu', lat: 13.0827, lng: 80.2707 },
    { address: 'Kolkata, West Bengal', lat: 22.5726, lng: 88.3639 }
  ];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  const userNames = ['Raj Kumar', 'Priya Singh', 'Amit Patel', 'Divya Sharma', 'Vikram Mehta', 'Meera Reddy'];

  // Generate item name based on category
  let name = '';
  let description = '';
  let imageUrl = '';
  
  if (category === 'food') {
    const foodItems = ['Rice Bag', 'Wheat Flour', 'Cooking Oil', 'Dal', 'Sugar', 'Tea Leaves', 'Packaged Spices', 'Canned Food', 'Packaged Snacks', 'Dairy Products'];
    name = foodItems[Math.floor(Math.random() * foodItems.length)];
    description = `Unused ${name.toLowerCase()}, in good condition`;
    imageUrl = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3';
  } else if (category === 'household') {
    const householdItems = ['Table Lamp', 'Kitchen Utensils', 'Bedsheets', 'Curtains', 'Wall Clock', 'Storage Containers', 'Cushions', 'Floor Mat', 'Cleaning Supplies'];
    name = householdItems[Math.floor(Math.random() * householdItems.length)];
    description = `Lightly used ${name.toLowerCase()}, still in good condition`;
    imageUrl = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3';
  } else if (category === 'medicine') {
    const medicineItems = ['Paracetamol', 'Vitamin Supplements', 'First Aid Kit', 'Antiseptic Cream', 'Cough Syrup', 'Insulin', 'Antibiotics', 'Pain Relievers'];
    name = medicineItems[Math.floor(Math.random() * medicineItems.length)];
    description = `Sealed ${name.toLowerCase()}, not expired`;
    imageUrl = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3';
  } else {
    const clothingItems = ['Winter Jacket', 'Cotton Shirts', 'Formal Wear', 'Traditional Clothes', 'Woolen Sweaters', 'Kids Clothes', 'School Uniforms'];
    name = clothingItems[Math.floor(Math.random() * clothingItems.length)];
    description = `Gently used ${name.toLowerCase()}, clean and ready to wear`;
    imageUrl = 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3';
  }
  
  mockItems.push({
    id: `${i}`,
    name: name,
    description: description,
    category: category,
    imageUrl: imageUrl,
    expiryDate: expiryDate,
    createdAt: createdAt,
    updatedAt: createdAt,
    status: status,
    userId: `user${Math.floor(Math.random() * 999) + 100}`,
    userName: userNames[Math.floor(Math.random() * userNames.length)],
    userPhoto: null,
    location: randomLocation,
    originalPrice: originalPrice,
    currentPrice: currentPrice,
    quantity: Math.floor(Math.random() * 20) + 1
  });
}

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
  
  const getStatusClass = (status: ItemStatus) => {
    switch (status) {
      case 'available': return 'zwm-status-available';
      case 'donated': return 'zwm-status-donated';
      case 'expired': return 'zwm-status-expired';
      case 'flagged': return 'zwm-status-pending';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryText = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your items and donations</p>
        </div>
        <Button 
          onClick={() => navigate('/items/add')} 
          className="zwm-gradient hover:opacity-90 transition-opacity"
        >
          Add New Item
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockItems.length}</div>
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
              {mockItems.filter(item => item.status === 'available').length}
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
              {mockItems.filter(item => item.status === 'donated').length}
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
            <div className="text-2xl font-bold">
              {/* Items expiring within 7 days */}
              {mockItems.filter(item => {
                const expiryDate = new Date(item.expiryDate);
                const today = new Date();
                const diffTime = expiryDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7 && diffDays > 0;
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full animate-fade-in" style={{ animationDelay: "400ms" }} onValueChange={(value) => {
        setSelectedStatus(value as ItemStatus | 'all');
        setCurrentPage(1);
      }}>
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
            items={currentItems} 
            getStatusClass={getStatusClass} 
            formatDate={formatDate}
            getCategoryText={getCategoryText} 
            onView={handleView}
            onEdit={handleEdit}
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </TabsContent>
        <TabsContent value="available" className="mt-6">
          <ItemsTable 
            items={currentItems}
            getStatusClass={getStatusClass} 
            formatDate={formatDate}
            getCategoryText={getCategoryText}
            onView={handleView}
            onEdit={handleEdit}
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </TabsContent>
        <TabsContent value="donated" className="mt-6">
          <ItemsTable 
            items={currentItems}
            getStatusClass={getStatusClass} 
            formatDate={formatDate}
            getCategoryText={getCategoryText}
            onView={handleView}
            onEdit={handleEdit}
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </TabsContent>
        <TabsContent value="expired" className="mt-6">
          <ItemsTable 
            items={currentItems}
            getStatusClass={getStatusClass} 
            formatDate={formatDate}
            getCategoryText={getCategoryText}
            onView={handleView}
            onEdit={handleEdit}
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ItemsTableProps {
  items: Item[];
  getStatusClass: (status: ItemStatus) => string;
  formatDate: (dateString: string) => string;
  getCategoryText: (category: string) => string;
  onView: (item: Item) => void;
  onEdit: (item: Item) => void;
}

const ItemsTable: React.FC<ItemsTableProps> = ({ 
  items, 
  getStatusClass, 
  formatDate,
  getCategoryText,
  onView,
  onEdit
}) => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getCategoryText(item.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusClass(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.expiryDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />{item.currentPrice?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline" className="hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                          onClick={() => onView(item)}>
                          <span className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" /></svg>
                          </span>
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="border-zwm-primary text-zwm-primary hover:bg-zwm-primary/10 hover:text-white transition-colors flex items-center"
                          onClick={() => onEdit(item)}>
                          <span className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.475 3.725a2.438 2.438 0 0 1 3.45 3.45L7.5 19.6l-4 1 1-4L16.475 3.725Z" /></svg>
                          </span>
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  
  // Logic to display page numbers
  const maxPagesToShow = 5;
  let startPage: number;
  let endPage: number;
  
  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
    
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex justify-center mt-6 items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="hidden sm:block"
      >
        First
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      <div className="flex items-center space-x-1">
        {pageNumbers.map(number => (
          <Button
            key={number}
            variant={currentPage === number ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(number)}
            className={currentPage === number ? "bg-zwm-primary text-white" : ""}
          >
            {number}
          </Button>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="hidden sm:block"
      >
        Last
      </Button>
      
      <span className="text-sm text-muted-foreground ml-2">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Dashboard;
