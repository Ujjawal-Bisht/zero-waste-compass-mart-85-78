
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Package, ShoppingCart, User } from 'lucide-react';
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar';

const SellerMenuBar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Store className="mr-2 h-4 w-4" />,
      path: '/seller/dashboard',
    },
    {
      name: 'Products',
      icon: <Package className="mr-2 h-4 w-4" />,
      path: '/seller/products',
    },
    {
      name: 'Orders',
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
      path: '/seller/orders',
    },
    {
      name: 'Profile',
      icon: <User className="mr-2 h-4 w-4" />,
      path: '/seller/profile',
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Hamburger button animation variants
  const hamburgerVariants = {
    open: {
      rotate: 45,
      y: 1,
    },
    closed: {
      rotate: 0,
      y: 0,
    },
  };

  const middleLineVariants = {
    open: {
      opacity: 0,
      x: -20,
    },
    closed: {
      opacity: 1,
      x: 0,
    },
  };

  const bottomLineVariants = {
    open: {
      rotate: -45,
      y: -7,
    },
    closed: {
      rotate: 0,
      y: 0,
    },
  };

  // Menu content animation variants
  const menuContainerVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
  };

  const menuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative z-50">
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu}
        className="relative flex flex-col items-center justify-center w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Toggle Menu"
      >
        <motion.span
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={hamburgerVariants}
          className="w-5 h-0.5 bg-white mb-1.5 block"
        ></motion.span>
        <motion.span
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={middleLineVariants}
          className="w-5 h-0.5 bg-white mb-1.5 block"
        ></motion.span>
        <motion.span
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={bottomLineVariants}
          className="w-5 h-0.5 bg-white block"
        ></motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuContainerVariants}
            className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="py-2">
              {menuItems.map((item) => (
                <motion.div key={item.path} variants={menuItemVariants}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 hover:bg-amber-50 transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-amber-100 text-amber-800 font-medium border-l-4 border-amber-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span className={`mr-3 ${location.pathname === item.path ? "text-amber-600" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    <span className="menu-item-text relative">
                      {item.name}
                      {location.pathname === item.path && (
                        <motion.span
                          layoutId="underline"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"
                        />
                      )}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerMenuBar;
