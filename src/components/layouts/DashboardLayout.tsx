
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus,
  LayoutDashboard, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Package,
  Truck,
  Store
} from 'lucide-react';
import { toast } from 'sonner';

const DashboardLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const sidebarItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/marketplace', label: 'Marketplace', icon: <ShoppingCart size={20} /> },
    { path: '/profile', label: 'Profile', icon: <Settings size={20} /> },
  ];

  // Add seller items if user is seller
  if (currentUser?.isSeller) {
    sidebarItems.push(
      { 
        path: '/seller/dashboard', 
        label: 'Seller Dashboard', 
        icon: <Store size={20} /> 
      },
      { 
        path: '/seller/products', 
        label: 'My Products', 
        icon: <Package size={20} /> 
      },
      { 
        path: '/seller/orders', 
        label: 'Orders', 
        icon: <Truck size={20} /> 
      },
      { 
        path: '/seller/profile', 
        label: 'Seller Profile', 
        icon: <Settings size={20} /> 
      }
    );
  }

  // Add admin item if user is admin
  if (currentUser?.isAdmin) {
    sidebarItems.push({ 
      path: '/admin', 
      label: 'Admin Panel', 
      icon: <Settings size={20} /> 
    });
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-zwm-primary flex items-center justify-center text-white font-bold text-xl">
                Z
              </div>
              {!isCollapsed && (
                <span className="ml-3 text-xl font-bold text-white">Zero Waste Mart</span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 pt-6 overflow-y-auto">
            <ul className="space-y-2 px-4">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg hover:bg-sidebar-accent transition-colors ${
                      location.pathname === item.path ? 'bg-sidebar-accent' : ''
                    }`}
                  >
                    <div className="text-sidebar-foreground">{item.icon}</div>
                    {!isCollapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center p-3 rounded-lg w-full hover:bg-sidebar-accent transition-colors"
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>

          {/* Collapse Button */}
          <div className="p-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-3 rounded-lg w-full flex justify-center hover:bg-sidebar-accent transition-colors"
            >
              {isCollapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 sticky top-0">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex-1">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-10 w-full" 
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser?.isSeller ? (
                <Button 
                  onClick={() => navigate('/items/add')} 
                  className="zwm-gradient hover:opacity-90 transition-opacity"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate('/items/add')} 
                  className="zwm-gradient hover:opacity-90 transition-opacity"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              )}
              <div className="ml-2 flex items-center">
                <Avatar>
                  <AvatarImage src={currentUser?.photoURL || undefined} />
                  <AvatarFallback>{getInitials(currentUser?.displayName)}</AvatarFallback>
                </Avatar>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium">{currentUser?.displayName || 'User'}</p>
                  {currentUser?.isSeller && (
                    <p className="text-xs text-muted-foreground">
                      {currentUser?.verified ? 'Verified Seller' : 'Seller'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
