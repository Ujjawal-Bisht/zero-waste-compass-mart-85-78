
import React from 'react';
import { useAuth } from '@/contexts/auth';
import MenuSectionGroup from './MenuSectionGroup';
import { NavigationProps } from './types';
import { 
  buyerMenuSections, 
  sellerMenuSections, 
  adminMenuItems 
} from './navigationData';
import NavItem from './NavItem';
import { useLocation } from 'react-router-dom';

const NavigationLinks: React.FC<NavigationProps> = ({ isSeller, onItemClick }) => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.isAdmin === true;
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const menuSections = isSeller ? sellerMenuSections : buyerMenuSections;
  
  // Calculate the starting index for each section for animation sequencing
  let itemIndexCounter = 0;
  
  return (
    <div className="space-y-4 py-2">
      {menuSections.map((section) => {
        const sectionStartIndex = itemIndexCounter;
        itemIndexCounter += section.items.length;
        
        return (
          <MenuSectionGroup
            key={section.title}
            section={section}
            startIndex={sectionStartIndex}
            onItemClick={onItemClick}
          />
        );
      })}
      
      {/* Admin Routes */}
      {isAdmin && (
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
            Administration
          </p>
          <div className="space-y-1.5">
            {adminMenuItems.map((item, i) => (
              <NavItem
                key={item.path}
                item={item}
                index={itemIndexCounter + i}
                isActive={isActive}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationLinks;
