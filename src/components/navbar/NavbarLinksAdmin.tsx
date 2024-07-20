import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { ItemContent } from '../menu/ItemContent';
import { SearchBar } from '../navbar/searchBar/SearchBar';
import { SidebarResponsive } from '../sidebar/Sidebar';
import PropTypes from 'prop-types';
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { FaEthereum } from 'react-icons/fa';
import routes from '../../routes';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';


export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [userName, setUserName] = useState('');
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const navigate = useNavigate();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  const menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  );
  const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchUserName = async (userId: string) => {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserName(`${userData.firstName} ${userData.lastName}`);
        if (userData.avatar) {
          setAvatarUrl(userData.avatar);
      }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserName(user.uid);
        setAvatarUrl(user.photoURL || '')
      } else {
        setUserName('');
        setAvatarUrl('');

      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutAlert(true);
      setTimeout(() => {
        setShowLogoutAlert(false);
        navigate('/home');
      }, 2000); // Show the alert for 2 seconds before navigating
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <>
      {showLogoutAlert && (
        <Alert
          status='success'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          zIndex='9999'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Logout Successful!
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            You have been successfully logged out. Redirecting to home page...
          </AlertDescription>
        </Alert>
      )}
      <Flex
        w={{ sm: '100%', md: 'auto' }}
        alignItems='center'
        flexDirection='row'
        bg={menuBg}
        flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
        p='10px'
        borderRadius='30px'
        boxShadow={shadow}>
        <SearchBar
          mb={() => {
            if (secondary) {
              return { base: '10px', md: 'unset' };
            }
            return 'unset';
          }}
          me='10px'
          borderRadius='30px'
        />
        <Flex
          bg={ethBg}
          display={secondary ? 'flex' : 'none'}
          borderRadius='30px'
          ms='auto'
          p='6px'
          align='center'
          me='6px'>
          <Flex align='center' justify='center' bg={ethBox} h='29px' w='29px' borderRadius='30px' me='7px'>
            <Icon color={ethColor} w='9px' h='14px' as={FaEthereum} />
          </Flex>
          <Text w='max-content' color={ethColor} fontSize='sm' fontWeight='700' me='6px'>
            1,924
            <Text as='span' display={{ base: 'none', md: 'unset' }}>
              {' '}
              ETH
            </Text>
          </Text>
        </Flex>
        <SidebarResponsive routes={routes} />
        <Menu>
          <MenuButton p='0px'>
            <Icon mt='6px' as={MdNotificationsNone} color={navbarIcon} w='18px' h='18px' me='10px' />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p='20px'
            borderRadius='20px'
            bg={menuBg}
            border='none'
            mt='22px'
            me={{ base: '30px', md: 'unset' }}
            minW={{ base: 'unset', md: '400px', xl: '450px' }}
            maxW={{ base: '360px', md: 'unset' }}>
            <Flex w='100%' mb='20px'>
              <Text fontSize='md' fontWeight='600' color={textColor}>
                Notifications
              </Text>
              <Text fontSize='sm' fontWeight='500' color={textColorBrand} ms='auto' cursor='pointer'>
                Mark all read
              </Text>
            </Flex>
            <Flex flexDirection='column'>
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
                <ItemContent info='Update on Irrigation' />
              </MenuItem>
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
                <ItemContent info='Irrigation started' />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton p='0px'>
            <Icon mt='6px' as={MdInfoOutline} color={navbarIcon} w='18px' h='18px' me='10px' />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p='20px'
            me={{ base: '30px', md: 'unset' }}
            borderRadius='20px'
            bg={menuBg}
            border='none'
            mt='22px'
            minW={{ base: 'unset' }}
            maxW={{ base: '360px', md: 'unset' }}>
            <Flex flexDirection='column'>
              <Link w='100%' href=''>
                <Button w='100%' h='44px' mb='10px' variant='brand'>
                  Contact us
                </Button>
              </Link>
              <Link w='100%' href=''>
                <Button
                  w='100%'
                  h='44px'
                  mb='10px'
                  border='1px solid'
                  bg='transparent'
                  borderColor={borderButton}>
                  See Documentation
                </Button>
              </Link>
              <Link w='100%' href=''>
                <Button w='100%' h='44px' variant='no-hover' color={textColor} bg='transparent'>
                  About us
                </Button>
              </Link>
            </Flex>
          </MenuList>
        </Menu>

        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={toggleColorMode}>
          <Icon
            me='10px'
            h='18px'
            w='18px'
            color={navbarIcon}
            as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
          />
        </Button>
        <Menu>
          <MenuButton p='0px'>
            <Avatar
              _hover={{ cursor: 'pointer' }}
              color='white'
              name={userName}
              src={avatarUrl}
              bg='#6FCF97'
              size='sm'
              w='40px'
              h='40px'

            />
          </MenuButton>
          <MenuList boxShadow={shadow} p='0px' mt='10px' borderRadius='20px' bg={menuBg} border='none'>
            <Flex w='100%' mb='0px'>
              <Text
                ps='20px'
                pt='16px'
                pb='10px'
                w='100%'
                borderBottom='1px solid'
                borderColor={borderColor}
                fontSize='sm'
                fontWeight='700'
                color={textColor}>
                👋&nbsp; Hey,  {userName.split(' ')[0]}
              </Text>
            </Flex>
            <Flex flexDirection='column' p='10px'>
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px'>
                <Text fontSize='sm'>Profile Settings</Text>
              </MenuItem>
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px'>
                <Text fontSize='sm'>Newsletter Settings</Text>
              </MenuItem>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                color='red.400'
                borderRadius='8px'
                px='14px'
                onClick={handleLogout}>
                <Text fontSize='sm'>Log out</Text>
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func
};