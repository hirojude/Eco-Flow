import React from 'react';
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import Content from './components/Content';
import { renderThumb, renderTrack, renderView } from '../scrollbar/Scrollbar';
import { IoMenuOutline } from 'react-icons/io5';
import Scrollbars from 'react-custom-scrollbars-2';

interface SidebarProps {
  routes: RoutesType[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
  const variantChange = '0.2s linear';
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarMargins = '0px';

  return (
    <Box display={{ base:'none', sm: 'none', xl: 'block' }} position='fixed' minH='100%'>
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w='250px'
        h='100vh'
        m={sidebarMargins}
        minH='100%'
        overflowX='hidden'
        boxShadow={shadow}>
        <Scrollbars autoHide renderTrackVertical={renderTrack} renderThumbVertical={renderThumb} renderView={renderView}>
          <Content routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );
};

const SidebarResponsive: React.FC<SidebarProps> = ({ routes }) => {
  const sidebarBackgroundColor = useColorModeValue('white', 'navy.800');
  const menuColor = useColorModeValue('gray.400', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <Flex display={{ sm: 'flex', xl: 'none' }} alignItems='center'>
      <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
        <Icon as={IoMenuOutline} color={menuColor} my='auto' w='20px' h='20px' me='10px' _hover={{ cursor: 'pointer' }} />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex='3'
            onClick={onClose}
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Scrollbars autoHide renderTrackVertical={renderTrack} renderThumbVertical={renderThumb} renderView={renderView}>
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Sidebar;
export { SidebarResponsive };
