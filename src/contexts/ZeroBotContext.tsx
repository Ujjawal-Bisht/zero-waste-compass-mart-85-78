
import React, { createContext, useContext, useState } from 'react';

interface ZeroBotContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sellerMode: boolean;
  setSellerMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZeroBotContext = createContext<ZeroBotContextType | undefined>(undefined);

export const ZeroBotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sellerMode, setSellerMode] = useState(false);
  
  return (
    <ZeroBotContext.Provider value={{ isOpen, setIsOpen, sellerMode, setSellerMode }}>
      {children}
    </ZeroBotContext.Provider>
  );
};

export const useZeroBotContext = () => {
  const context = useContext(ZeroBotContext);
  if (context === undefined) {
    throw new Error('useZeroBotContext must be used within a ZeroBotProvider');
  }
  return context;
};
