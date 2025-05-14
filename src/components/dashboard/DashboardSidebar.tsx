
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import { Logo } from '@/components/ui/logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/auth';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  User, 
  LogOut, 
  PlusCircle,
  Store,
  ShieldCheck,
  Menu
} from 'lucide-react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export const DashboardSidebar = ({ className, onClose, ...props }: SidebarNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentUser, logout } = useAuth();
  const isSeller = currentUser?.isSeller;
  
  const buyerLinks = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Marketplace',
      href: '/marketplace',
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Add Item',
      href: '/items/add',
      icon: <PlusCircle className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: <User className="mr-2 h-4 w-4" />,
    }
  ];

  const sellerLinks = [
    {
      title: 'Seller Dashboard',
      href: '/seller/dashboard',
      icon: <Store className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Products',
      href: '/seller/products',
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Orders',
      href: '/seller/orders',
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Seller Profile',
      href: '/seller/profile',
      icon: <ShieldCheck className="mr-2 h-4 w-4" />,
    }
  ];

  const navigationLinks = isSeller ? sellerLinks : buyerLinks;

  const handleItemClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Sidebar 
      className={cn("pb-12 bg-navy-blue", className)} 
      {...props}
    >
      <div className="px-3 py-2">
        <div className="mb-8 pl-2 flex items-center">
          <Logo className="cursor-pointer hover-scale" onClick={handleLogoClick} />
        </div>
        <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight text-white">
          {isSeller ? 'Seller Portal' : 'Navigation'}
        </h2>
        <div className="space-y-1">
          {navigationLinks.map((link) => (
            <Button
              key={link.href}
              variant={location.pathname === link.href ? "secondary" : "ghost"}
              className={`w-full justify-start ${location.pathname === link.href ? 'bg-white bg-opacity-20 text-white' : 'text-gray-200 hover:bg-white hover:bg-opacity-10'} transition-all duration-300`}
              onClick={handleItemClick}
              asChild
            >
              <Link to={link.href}>
                {link.icon}
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        <Button 
          className="w-full justify-start text-white hover:bg-white hover:bg-opacity-10" 
          variant="ghost" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4 transition-transform duration-300" />
          Logout
        </Button>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
