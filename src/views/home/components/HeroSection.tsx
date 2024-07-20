// WithBackgroundImage.js
'use client'

import { Stack, Flex, VStack, useBreakpointValue, Button, Center } from '@chakra-ui/react';
import featureImage from '../../../assets/img/layout/back 3.jpg';
import Logo from '../../../components/Logo';
import { useNavigate } from 'react-router-dom';
import { RefObject } from 'react'; // Import RefObject

interface WithBackgroundImageProps {
  featuresRef: RefObject<HTMLDivElement>;
}

export default function WithBackgroundImage({ featuresRef }: WithBackgroundImageProps) {
  const navigate = useNavigate(); // Get the navigation function

  const handleSignInClick = () => {
    navigate("/auth/signin"); // Navigate to the sign-in page on button click
  };

  const handleMoreInfoClick = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the features section
    }
  };

  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={featureImage}
      backgroundSize={'cover'}
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
         <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
      <Center w="100%">
        <Logo maxH={{base:2,mb:130}} />
      </Center>
      <Stack direction={{ base: 'column', md: 'row' }} px="auto" mt={5} w="100%">
        <Button
          fontSize="sm"
          variant="brand"
          fontWeight="500"
          w={{ base: '60%', md: '50%' }}
          h="50"
          mb="24px"
          mx={{base: "10%"}}
          _hover={{ bg: "whiteAlpha.500" }} // Hover effect
          onClick={handleSignInClick} // Call handleSignInClick on button click
        >
          Sign In
        </Button>
        <Button
          fontSize="sm"
          variant="brand"
          fontWeight="500"
          w={{ base: '60%', md: '50%' }}
          h="50"
          mb="24px"
          mx={{base: "10%"}}
          _hover={{ bg: 'whiteAlpha.500' }}
          onClick={handleMoreInfoClick} // Call handleMoreInfoClick on button click
        >
          More Info
        </Button>
      </Stack>
    </Stack>
      </VStack>
    </Flex>
  );
}
