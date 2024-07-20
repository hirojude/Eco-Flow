import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HSeparator } from "../../components/separator/Separator";
import DefaultAuth from "../../layout/auth/Default";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Card from "../../components/card/Card";
import { auth, db } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue(
      { bg: "gray.200" },
      { bg: "whiteAlpha.300" }
    );
    const googleActive = useColorModeValue(
      { bg: "secondaryGray.300" },
      { bg: "whiteAlpha.200" }
    );

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handlePasswordClick = () => setShowPassword(!showPassword);
    const handleConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);

    const saveUserDetails = async (userId: string, firstName: string, lastName: string) => {
      try {
        await setDoc(doc(db, "users", userId), {
          firstName,
          lastName,
        });
      } catch (error) {
        console.error("Error saving user details: ", error);
      }
    };

    const handleSignUp = async () => {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        await saveUserDetails(user.uid, firstName, lastName);
        navigate("/admin/default");
      } catch (error) {
        setError((error as Error).message);
      }
    };

    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (!user.displayName) {
          const firstName = prompt("Please enter your first name:");
          const lastName = prompt("Please enter your last name:");
          if (firstName && lastName) {
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
            await saveUserDetails(user.uid, firstName, lastName);
          }
        } else {
          const [firstName, lastName] = user.displayName.split(' ');
          await saveUserDetails(user.uid, firstName, lastName);
        }
        navigate("/admin/default");
      } catch (error) {
        setError((error as Error).message);
      }
    };

  return (
    <DefaultAuth>
      <center>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "10px" }}
          flexDirection="column"
          zIndex="2"
        >
          <Card p={50}>
            <Box me="auto">
                <Heading color={textColor} fontSize="36px" mb="10px" ml={-110}>
                    Sign Up
                </Heading>
                <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
                    Enter your details to create your account!
                </Text>
            </Box>
            <Flex
                direction="column"
                w={{ base: "100%", md: "420px" }}
                maxW="100%"
                background="transparent"
                borderRadius="15px"
                mx={{ base: "auto", lg: "unset" }}
                me="auto"
                mb={{ base: "20px", md: "auto" }}
            >
              <Button
                fontSize="sm"
                me="0px"
                mb="26px"
                py="15px"
                h="50px"
                borderRadius="16px"
                bg={googleBg}
                color={googleText}
                fontWeight="500"
                _hover={googleHover}
                _active={googleActive}
                _focus={googleActive}
                onClick={handleGoogleSignIn}
              >
                    <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                    Sign up with Google
              </Button>
              <Flex align="center" mb="25px">
                    <HSeparator />
                        <Text color="gray.400" mx="14px">
                            or
                        </Text>
                    <HSeparator />
              </Flex>
              <FormControl>
                    <Flex gap={5}>
                        <center>
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                mb="8px"
                            >
                                First Name<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: "0px", md: "0px" }}
                                type="text"
                                placeholder="First Name"
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                    </center>
                        <center>
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                mb="8px"
                            >
                                Last Name<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: "0px", md: "0px" }}
                                type="text"
                                placeholder="Last Name"
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </center>
                    </Flex>
                    <FormLabel
                        display="flex"
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColor}
                        mb="8px"
                    >
                      Email<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        isRequired={true}
                        variant="auth"
                        fontSize="sm"
                        ms={{ base: "0px", md: "0px" }}
                        type="email"
                        placeholder="mail@simmmple.com"
                        mb="24px"
                        fontWeight="500"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormLabel
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColor}
                        display="flex"
                    >
                        Password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size="md">
                        <Input
                            isRequired={true}
                            fontSize="sm"
                            placeholder="Min. 8 characters"
                            mb="24px"
                            size="lg"
                            type={showPassword ? "text" : "password"}
                            variant="auth"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement display="flex" alignItems="center" mt="4px">
                            <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                            onClick={handlePasswordClick}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <FormLabel
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColor}
                        display="flex"
                    >
                        Confirm Password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size="md">
                        <Input
                            isRequired={true}
                            fontSize="sm"
                            placeholder="Confirm Password"
                            mb="24px"
                            size="lg"
                            type={showConfirmPassword ? "text" : "password"}
                            variant="auth"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputRightElement display="flex" alignItems="center" mt="4px">
                            <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={showConfirmPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                            onClick={handleConfirmPasswordClick}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Flex justifyContent="space-between" align="center" mb="24px">
                    <FormControl display="flex" alignItems="center">
                        <Checkbox
                        id="terms-conditions"
                        colorScheme="brand"
                        me="10px"
                        />
                        <FormLabel
                        htmlFor="terms-conditions"
                        mb="0"
                        fontWeight="normal"
                        color={textColor}
                        fontSize="sm"
                        >
                        I agree to the{" "}
                        <NavLink to="/terms-conditions">
                            <Text
                            color={textColorBrand}
                            fontSize="sm"
                            fontWeight="500"
                            as="span"
                            >
                            Terms and Conditions
                            </Text>
                        </NavLink>
                        </FormLabel>
                    </FormControl>
                    </Flex>
                    {error && (
                    <Text color="red.500" mb="24px">
                        {error}
                    </Text>
                    )}
                    <Button
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="24px"
                    onClick={handleSignUp}
                    >
                    Sign Up
                    </Button>
                </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="start"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                  Already have an account?
                  <NavLink to="/auth/sign-in">
                    <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                      Sign In
                    </Text>
                  </NavLink>
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </center>
    </DefaultAuth>
  );
}

export default SignUp;
