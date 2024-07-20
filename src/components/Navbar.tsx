import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import routes from '../routes';

const Navbar: React.FC = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between" align="center">
        {routes.map((route, index) => (
          <Link
            key={index}
            as={RouterLink}
            to={`${route.layout}${route.path}`}
            color="white"
            fontSize="lg"
            fontWeight="bold"
            ml={4}
          >
            {route.name}
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default Navbar;
