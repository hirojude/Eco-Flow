import React, { useState } from 'react';
import { Box, Portal, useDisclosure } from '@chakra-ui/react';
import Footer from '../../components/footer/FooterAdmin';
import Navbar from '../../components/navbar/NavbarAdmin';
import Sidebar, { SidebarResponsive } from '../../components/sidebar/Sidebar';
import { SidebarContext } from '../../contexts/SidebarContext';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import routes from '../../routes';

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

  const getRoute = () => {
    return location.pathname !== '/admin/full-screen-maps';
  };

  const getActiveRoute = (routes: RoutesType[]): string => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname === routes[i].layout + routes[i].path) {
        return routes[i].name;
      }
    }
    return 'Default Brand Text';
  };

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

  const getRoutes = (routes: RoutesType[]) => {
    return routes.map((route, key) => {
      if (route.layout === '/admin') {
        return <Route path={route.path} element={<route.component />} key={key} />;
      }
      return null;
    });
  };

  return (
    <Box>
      <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
        <Sidebar routes={routes}  {...props} />
        <SidebarResponsive routes={routes} {...props} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc(100% - 250px)' }}
          maxWidth={{ base: '100%', xl: 'calc(100% - 250px)' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'Horizon UI Dashboard PRO'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...props}
              />
            </Box>
          </Portal>
          {getRoute() && (
            <Box mx="auto" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
              <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/admin/default" />} />
              </Routes>
            </Box>
          )}
          <Footer />
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
};

export default AdminLayout;
