import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  useSteps,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Stepper as ChakraStepper,
  Flex,
  useColorModeValue,
  IconButton,
  Center,
  RadioGroup,
  Radio,
  
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { db } from "../../config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import FixedPlugin from "../../components/fixedPlugin/FixedPlugin";
import Card from "../../components/card/Card";
import CropSelector from './CropSelector';
import { useBreakpointValue } from '@chakra-ui/react';
const Stepper = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "brand.600";
  const { userId } = useParams();
  const [location, setLocation] = useState("");
  const [fields, setFields] = useState([
    { name: "", sensors: [""], crops: [{ name: "", localName: "", growthStage: "" }] },
  ]);
  const navigate = useNavigate();
  const orientation = useBreakpointValue({ base: 'horizontal', md: 'vertical' })as 'horizontal' | 'vertical' | undefined;
  const height = useBreakpointValue({ base: 'auto', md: 400 });
  

  const steps = useBreakpointValue({md:[
    { title: "Location", description: "Enter your location" },
    { title: "Fields and Sensors", description: "Enter fields and sensors" },
    { title: "Crop Information", description: "Enter crop information" },
    { title: "Complete", description: "Review and submit your information" },
  ],base:[
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ]})  || [];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleAddField = () => {
    setFields([
      ...fields,
      { name: "", sensors: [""], crops: [{ name: "", localName: "", growthStage: "" }] },
    ]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleFieldNameChange = (index: number, value: string) => {
    const newFields = fields.map((field, i) =>
      i === index ? { ...field, name: value } : field
    );
    setFields(newFields);
  };

  const handleSensorChange = (fieldIndex: number, sensorIndex: number, value: string) => {
    const newFields = fields.map((field, i) =>
      i === fieldIndex
        ? {
            ...field,
            sensors: field.sensors.map((sensor, j) =>
              j === sensorIndex ? value : sensor
            ),
          }
        : field
    );
    setFields(newFields);
  };

  const handleAddSensor = (fieldIndex: number) => {
    const newFields = fields.map((field, i) =>
      i === fieldIndex ? { ...field, sensors: [...field.sensors, ""] } : field
    );
    setFields(newFields);
  };

  const handleRemoveSensor = (fieldIndex: number, sensorIndex: number) => {
    const newFields = fields.map((field, i) =>
      i === fieldIndex
        ? {
            ...field,
            sensors: field.sensors.filter((_, j) => j !== sensorIndex),
          }
        : field
    );
    setFields(newFields);
  };

  const handleCropChange = (fieldIndex: number, cropIndex: number, selectedCrop: { name: string; localName: string; }) => {
    const newFields = fields.map((field, i) =>
      i === fieldIndex
        ? {
            ...field,
            crops: field.crops.map((crop, j) =>
              j === cropIndex
                ? {
                    name: selectedCrop?.name || "",
                    localName: selectedCrop?.localName || "",
                    growthStage: crop.growthStage,

                  }
                : crop
            ),
          }
        : field
    );
    setFields(newFields);
  };

  const handleAddCrop = (fieldIndex: number) => {
    const newFields = fields.map((field, i) =>
      i === fieldIndex
        ? {
            ...field,
            crops: [...field.crops, { name: "", localName: "", growthStage: "" }],
          }
        : field
    );
    setFields(newFields);
  };

  const handleRemoveCrop = (fieldIndex: number, cropIndex: number) => {
    const newFields = fields.map((field, i) =>
      i === fieldIndex
        ? { ...field, crops: field.crops.filter((_, j) => j !== cropIndex) }
        : field
    );
    setFields(newFields);
  };

  const handleGrowthStageChange = (fieldIndex: number, cropIndex: number, value: string) => {
    const newFields = fields.map((field, i) =>
      i === fieldIndex
        ? {
            ...field,
            crops: field.crops.map((crop, j) =>
              j === cropIndex ? { ...crop, growthStage: value } : crop
            ),
          }
        : field
    );
    setFields(newFields);
  };

  const handleSubmit = async () => {
    if (userId) {
      try {
        await updateDoc(doc(db, "users", userId), {
          location,
          fields,
        });
        alert("Information saved successfully!");
        navigate("/admin/default");
      } catch (error) {
        console.error("Error saving stepper data: ", error);
      }
    }
  };

  

  return (
    <Center w="100%">
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
      >
        <Heading color={textColor} textAlign="center">User Information Stepper</Heading>
        <Flex direction= {{base:"column", md:"row"}} align={{base:"center", md:""}} justify="space-around" h="600" p={4} gap="10%" w="100%" mx={{base:"10%"}}>
          <ChakraStepper
            index={activeStep}
            colorScheme="brand"
            size="lg"
            orientation={orientation}
            h={height}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </ChakraStepper>
          <Card gap={5} maxW="md" w="390px" minH="365px">
            <Box w="full" maxH="400px" overflow="auto ">
              {activeStep === 0 && (
                <FormControl id="location">
                  <FormLabel
                    // display="flex"
                    ms="4px"
                    fontSize="lg"
                    fontWeight="500"
                    color={textColor}
                    mb="60px"
                    textAlign="center"
                  >
                    Location
                  </FormLabel>
                  <Text mb="3px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md" align="center">
                    Enter the location your of your Farm
                  </Text>
                  <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
                    placeholder="Enter your location"
                    mb="24px"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    fontWeight="500"
                    size="lg"
                    
                  />
                  <Text mb={2}>Location: {location}</Text>
                </FormControl>
              )}

              {activeStep === 1 && (
                <FormControl id="fields">
                  <FormLabel
                    // display="flex"
                    ms="4px"
                    fontSize="lg"
                    fontWeight="500"
                    color={textColor}
                    mb="20px"
                    textAlign="center"
                  >
                    Fields and Sensors
                  </FormLabel>
                  {fields.map((field, fieldIndex) => (
                    <Box key={fieldIndex} mb={4} p={4} border="1px solid" borderColor="brand.600" borderRadius="md">
                      <Text mb={2} fontSize="md" fontWeight="500" align="center">
                        Field - {fieldIndex+1}
                      </Text>
                      <Input
                        isRequired={true}
                        type="text"
                        placeholder="Field Name"
                        mb={2}
                        borderColor="brand.500"
                        value={field.name}
                        onChange={(e) => handleFieldNameChange(fieldIndex, e.target.value)}
                      />
                      {field.sensors.map((sensor, sensorIndex) => (
                        <Box key={sensorIndex} mb={2} display="flex" alignItems="center">
                          <Text mr={2} flexShrink={0}> Sensor Id:</Text>
                          <Input
                            borderColor="brand.200"
                            type="text"
                            placeholder="Sensor ID"
                            value={sensor}
                            w={160}
                            onChange={(e) => handleSensorChange(fieldIndex, sensorIndex, e.target.value)}
                          />
                          <IconButton
                            aria-label="Remove Sensor"
                            icon={<CloseIcon />}
                            size="sm"
                            ml={2}
                            onClick={() => handleRemoveSensor(fieldIndex, sensorIndex)}
                          />
                        </Box>
                      ))}
                      <Button
                        leftIcon={<AddIcon />}
                        colorScheme="teal"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddSensor(fieldIndex)}
                      >
                        Add Sensor
                      </Button>
                      <Button
                        leftIcon={<CloseIcon />}
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        ml={2}
                        onClick={() => handleRemoveField(fieldIndex)}
                      >
                        Remove Field
                      </Button>
                    </Box>
                  ))}
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="teal"
                    variant="outline"
                    onClick={handleAddField}
                  >
                    Add Field
                  </Button>
                </FormControl>
              )}

              {activeStep === 2 && (
                <FormControl id="cropInformation">
                  <FormLabel
                    // display="flex"
                    ms="4px"
                    fontSize="lg"
                    fontWeight="500"
                    color={textColor}
                    mb="20px"
                    textAlign="center"
                  >
                    Feild Crop Information
                  </FormLabel>
                  {fields.map((field, fieldIndex) => (
                    <Box key={fieldIndex} mb={4} p={4} border="1px solid" borderColor="brand.600" borderRadius="md">
                      <Heading as="h4" size="md" mb={4}>
                        {`Field ${fieldIndex + 1 } : ${field.name}`  || `Field ${fieldIndex + 1}`}
                      </Heading>
                      {field.crops.map((crop, cropIndex) => (
                        <Box key={cropIndex} mb={4} p={2} border="1px solid" borderColor="brand.200" borderRadius="md">
                          <CropSelector
                            fieldIndex={fieldIndex}
                            cropIndex={cropIndex}
                            handleCropChange={handleCropChange}
                            selectedCrop={crop}

                          />
                          <Text mb="3px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
                            Growth Stage
                          </Text>
                          <RadioGroup
                            onChange={(value) => handleGrowthStageChange(fieldIndex, cropIndex, value)}
                            value={crop.growthStage}
                          >
                            <Flex direction="column" ml={5} mb={5}>
                              <Radio value="Germination and Seedling">Germination and Seedling</Radio>
                              <Radio value="Vegetative Growth and Flowering">Vegetative Growth and Flowering</Radio>
                              <Radio value="Fruiting and Maturation">Fruiting and Maturation</Radio>
                            </Flex>
                          </RadioGroup>
                          <Button
                            leftIcon={<CloseIcon />}
                            colorScheme="red"
                            variant="outline"
                            size="sm"
                            mt={2}
                            onClick={() => handleRemoveCrop(fieldIndex, cropIndex)}
                          >
                            Remove Crop
                          </Button>
                        </Box>
                      ))}
                      <Button
                        leftIcon={<AddIcon />}
                        colorScheme="teal"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddCrop(fieldIndex)}
                      >
                        Add Crop
                      </Button>
                    </Box>
                  ))}
                </FormControl>
              )}

              {activeStep === 3 && (
                <Box>
                  <Heading as="h3" size="lg" mb="20px" textAlign="center">
                    Review your information
                  </Heading>
                  <Text mb={2}>Location: {location}</Text>
                  {fields.map((field, fieldIndex) => (
                    <Box key={fieldIndex} mb={4} p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
                      <Heading as="h4" size="md" mb={4}>
                      {`Field ${fieldIndex + 1 } : ${field.name}`  || `Field ${fieldIndex + 1}`}
                      </Heading>
                      <Text>Sensors: {field.sensors.join(", ")}</Text>
                      {field.crops.map((crop, cropIndex) => (
                        <Box key={cropIndex} mb={4}>
                          <Text>
                            Crop {cropIndex + 1}: {crop.name}
                          </Text>
                          <Text>Local Name: {crop.localName}</Text>
                          <Text>Growth Stage: {crop.growthStage}</Text>
                        </Box>
                      ))}
                    </Box>
                  ))}
                  
                </Box>
              )}
            </Box>
          </Card>
        </Flex>
        <Flex  mt={4} w="100%" justifyContent="space-evenly">
          <Button
            colorScheme="teal"
            variant="outline"
            isDisabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Back
          </Button>
          {/* <Spacer /> */}
          <Button
                variant="brand"
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    handleSubmit();
                  } else {
                    setActiveStep(activeStep + 1);
                  }
                }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
        </Flex>
      </Flex>
      <FixedPlugin />
    </Center>
    
  );
};

export default Stepper;
