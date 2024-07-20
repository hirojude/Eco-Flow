import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, IconButton, Text, Flex, RadioGroup, Radio } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import Card from '../../../../components/card/Card';
import CropSelector from './CropSelector'; // Adjust the path as necessary
import { Crop, Field } from './types'; // Adjust the path as necessary

interface FieldItemProps {
  field: Field;
  fieldIndex: number;
  handleFieldNameChange: (fieldIndex: number, name: string) => void;
  handleSensorChange: (fieldIndex: number, sensorIndex: number, sensor: string) => void;
  handleAddSensor: (fieldIndex: number) => void;
  handleRemoveSensor: (fieldIndex: number, sensorIndex: number) => void;
  handleAddCrop: (fieldIndex: number) => void;
  handleRemoveField: (fieldIndex: number) => void;
  handleRemoveCrop: (fieldIndex: number, cropIndex: number) => void;
  handleCropChange: (fieldIndex: number, cropIndex: number, crop: Crop | undefined) => void;
  handleGrowthStageChange: (fieldIndex: number, cropIndex: number, growthStage: string) => void;
}

const FieldItem: React.FC<FieldItemProps> = ({
  field,
  fieldIndex,
  handleFieldNameChange,
  handleSensorChange,
  handleAddSensor,
  handleRemoveSensor,
  handleAddCrop,
  handleRemoveField,
  handleRemoveCrop,
  handleCropChange,
  handleGrowthStageChange
}) => {
  return (
    <Card mb={4} p={4} borderRadius="md">
      <Flex justifyContent="space-between" mb={5}>
        <Text mb={2} fontSize="md" fontWeight="500" align="center">
          Field - {fieldIndex + 1}
        </Text>
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
      </Flex>
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
      <Flex mb={5} w="100%" justifyContent="space-evenly">
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="outline"
          size="sm"
          onClick={() => handleAddSensor(fieldIndex)}
        >
          Add Sensor
        </Button>
      </Flex>
      {field.crops.map((crop, cropIndex) => (
        <Box key={cropIndex} mb={4} p={2} border="1px solid" borderColor="brand.200" borderRadius="md">
          <FormControl id="cropInformation">
            <FormLabel
              ms="4px"
              fontSize="lg"
              fontWeight="500"
              color="textColor"
              mb="20px"
              textAlign="center"
            >
              Crop Information
            </FormLabel>
            <CropSelector
              fieldIndex={fieldIndex}
              cropIndex={cropIndex}
              handleCropChange={handleCropChange}
              selectedCrop={crop}
            />
            <Text mb="3px" ms="4px" color="textColorSecondary" fontWeight="400" fontSize="md">
              Growth Stage
            </Text>
            <RadioGroup
              onChange={(value) => handleGrowthStageChange(fieldIndex, cropIndex, value)}
              value={crop.growthStage || ''}
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
          </FormControl>
        </Box>
      ))}
      <Flex justifyContent='center'>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="outline"
          size="sm"
          onClick={() => handleAddCrop(fieldIndex)}
        >
          Add Crop
        </Button>
      </Flex>
    </Card>
  );
};

export default FieldItem;
