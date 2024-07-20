// src/contexts/SidebarContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextProps {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
