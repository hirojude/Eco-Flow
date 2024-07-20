/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import Head from "next/head";
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import Logo from '../../components/Logo';

export default function AdminNavbarWithCallToAction(props: {
  secondary: boolean;
  message: string | boolean;
  brandText: string;
  logoText: string;
  fixed: boolean;
  onOpen: (...args: any[]) => any;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setScrolled] = useState(false); //scrolled

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { brandText } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  const mainText = useColorModeValue("navy.700", "white");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navbarPosition = "fixed" as const;
  const navbarFilter = "none";
  const navbarBackdrop = "blur(20px)";
  const navbarShadow = "none";
  const navbarBg = useColorModeValue("rgba(244, 247, 254, 0.2)", "rgba(11,20,55,0.5)");
  const navbarBorder = "transparent";
  const secondaryMargin = "0px";
  const paddingX = "15px";
  const gap = "0px";
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");

  return (
    <>
      <Box
        position={navbarPosition}
        boxShadow={navbarShadow}
        bg={navbarBg}
        borderColor={navbarBorder}
        filter={navbarFilter}
        backdropFilter={navbarBackdrop}
        backgroundPosition="center"
        backgroundSize="cover"
        borderRadius="16px"
        borderWidth="1.5px"
        borderStyle="solid"
        transitionDelay="0s, 0s, 0s, 0s"
        transitionDuration="0.25s, 0.25s, 0.25s, 0s"
        transitionProperty="box-shadow, background-color, filter, border"
        transitionTimingFunction="linear, linear, linear, linear"
        alignItems="center"
        display="flex"
        minH="70px"
        maxH="90px"
        justifyContent="center"
        lineHeight="25.6px"
        mx="3%"
        mt={secondaryMargin}
        pb="8px"
        px={{
          sm: paddingX,
          md: "10px",
        }}
        ps={{
          xl: "12px",
        }}
        pt="8px"
        top={{ base: "12px", md: "16px", xl: "18px" }}
        w="94%"
      >
        <Center>
        <Logo h='50px' w='175px' my='32px'ml={5}  />
        </Center>
        <Flex
          w="100%"
          flexDirection={{
            sm: "column",
            md: "row",
          }}
          alignItems={{ xl: "center" }}
          mb={gap}
        >
          <Box mb={{ sm: "8px", md: "0px" }}>
            <Link
              color={mainText}
              href="#"
              bg="inherit"
              borderRadius="inherit"
              fontWeight="bold"
              fontSize="34px"
              _hover={{ color: { mainText } }}
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              {brandText}
            </Link>
          </Box>
          <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
            <Button
              variant="no-hover"
              bg="transparent"
              p="0px"
              minW="unset"
              minH="unset"
              h="18px"
              w="max-content"
              onClick={toggleColorMode}
            >
              <Icon
                me="10px"
                h="18px"
                w="18px"
                color={navbarIcon}
                as={colorMode === "light" ? IoMdMoon : IoMdSunny}
              />
            </Button>
          </Box>
        </Flex>
      </Box>

      
    </>
  );
}


