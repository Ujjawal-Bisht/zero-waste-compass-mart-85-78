
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardBoxProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  onClick: () => void;
  active: boolean;
}

const CardBox: React.FC<CardBoxProps> = ({ 
  children, 
  icon: Icon, 
  title, 
  desc, 
  onClick, 
  active 
}) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: '0 0 12px #a0a0ff55' }}
    animate={active ? { borderColor: "#5b4fff" } : { borderColor: "#eeeeee" }}
    className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 mb-2 bg-white cursor-pointer transition-all shadow-md min-h-[160px] ${active ? "shadow-blue-100 border-zwm-primary" : "border-gray-100"}`}
    onClick={onClick}
    tabIndex={0}
  >
    <Icon size={32} className={active ? 'text-blue-500 mb-3' : 'mb-3 text-gray-400'} />
    <div className={`font-semibold text-base ${active ? "text-blue-700" : "text-gray-900"}`}>{title}</div>
    <div className="text-xs mt-1 text-gray-500 text-center">{desc}</div>
    {children}
  </motion.div>
);

export default CardBox;
