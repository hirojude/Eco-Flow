import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AdminLayout from './layout/admin/AdminLayout';
import AuthLayout from './layout/auth/AuthLayout';
import HomeLayout from './layout/home/HomeLayout';
import theme from './theme/theme';
import { StateContextProvider } from './components/Weather/Context/index';
import Stepper from './views/stepper/stepper';
import { AuthProvider } from './contexts/AuthProvider'; // Adjust the path as necessary

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <StateContextProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path='/admin/*' element={<AdminLayout />} />
              <Route path='/auth/*' element={<AuthLayout />} />
              <Route path='/home/*' element={<HomeLayout />} />
              <Route path='*' element={<Navigate to='/home/homePage' />} />
              <Route path='/stepper/:userId' element={<Stepper />} />
            </Routes>
          </Router>
        </AuthProvider>
      </StateContextProvider>
    </ChakraProvider>
  );
};

export default App;
