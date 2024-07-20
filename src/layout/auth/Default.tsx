// src/layouts/auth/Default.tsx
import React from 'react';
import {  Flex, Icon, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Footer from '../../components/footer/FooterAuth';
import FixedPlugin from '../../components/fixedPlugin/FixedPlugin';

interface DefaultAuthProps {
  children: React.ReactNode;
}

const DefaultAuth: React.FC<DefaultAuthProps> = ({ children }) => {
  return (
    <Flex minH="100vh" justifyContent="center" alignItems="center">
      <Flex
        flexDirection="column"
        maxW={{ md: '66%', lg: '1313px' }}
        mx="auto"
        pt={{ sm: '50px', md: '0px' }}
        px={{ lg: '30px', xl: '0px' }}
        ps={{ xl: '70px' }}
      >
        <NavLink to="/home" style={{ width: 'fit-content', marginTop: '10px' }}>
          <Flex align="center" ps={{ base: '25px', lg: '0px' }} pt={{ lg: '0px', xl: '0px' }} w="fit-content">
            <Icon as={FaChevronLeft} me="12px" h="13px" w="8px" color="secondaryGray.600" />
            <Text ms="0px" fontSize="sm" color="secondaryGray.600">
              Back to Home
            </Text>
          </Flex>
        </NavLink>
        
        {children}
        
        <Footer />
      </Flex>
      
      <FixedPlugin />
    </Flex>
  );
};

export default DefaultAuth;
