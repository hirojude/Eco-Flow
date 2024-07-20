import React from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Routes, Navigate } from 'react-router-dom';
import routes from '../../routes';

const AuthLayout: React.FC = () => {
  const getRoutes = () => {
    return routes.map((route, key) => {
      if (route.layout === '/auth') {
        return <Route path={route.path} element={<route.component />} key={key} />;
      }
      return null;
    });
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Routes>
        {getRoutes()}
        {/* Redirect to /auth/sign-in if no matching route is found */}
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </Box>
  );
};

export default AuthLayout;
