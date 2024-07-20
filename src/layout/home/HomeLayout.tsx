import React, { useState } from 'react';
import { Box, Portal, useDisclosure } from '@chakra-ui/react';
import AdminNavbarWithCallToAction from '../../components/navbar/HomeNavbar';
import { SidebarContext } from '../../contexts/SidebarContext';
import {  useLocation } from 'react-router-dom';
import routes from '../../routes';
import HomePage from '../../views/home/HomePage';

interface RoutesType {
  name: string;
  layout: string;
  path: string;
  component: React.FC;
  icon?: JSX.Element;
  secondary?: boolean;
}

const AdminLayout: React.FC = (props) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const { onOpen } = useDisclosure();
    const [fixed] = useState(false);
    const location = useLocation();
  
  
  
    const getActiveNavbar = (routes: RoutesType[]): boolean => {
      for (let i = 0; i < routes.length; i++) {
        if (location.pathname === routes[i].layout + routes[i].path) {
          return routes[i].secondary || false;
        }
      }
      return false;
    };
  
    const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
      for (let i = 0; i < routes.length; i++) {
        if (location.pathname === routes[i].layout + routes[i].path) {
          return routes[i].name;
        }
      }
      return false;
    };
  
  return (
    <Box>
      <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
        <Box
        //   float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
        //   position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: '100%' }}
          maxWidth={{ base: '100%', xl: '100%' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <AdminNavbarWithCallToAction
                onOpen={onOpen}
                logoText={'Smart Irrigation'}
                brandText={"HomePage"}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...props}
              />
            </Box>
          </Portal>
          <HomePage/>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
};

export default AdminLayout;
