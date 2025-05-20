
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import { MenuSection } from './types';

interface MenuSectionGroupProps {
  section: MenuSection;
  startIndex: number;
  onItemClick?: () => void;
}

const MenuSectionGroup: React.FC<MenuSectionGroupProps> = ({ 
  section, 
  startIndex, 
  onItemClick 
}) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="px-3 py-2">
      <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
        {section.title}
      </p>
      <div className="space-y-1.5">
        {section.items.map((item, idx) => (
          <NavItem
            key={item.path}
            item={item}
            index={startIndex + idx}
            isActive={isActive}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSectionGroup;
