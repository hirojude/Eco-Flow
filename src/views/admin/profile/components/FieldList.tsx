import React from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import FieldItem from './FieldItem';
import { Field, Crop } from './types'; // Adjust the path as necessary

interface FieldListProps {
  fields: Field[];
  handleFieldNameChange: (index: number, name: string) => void;
  handleSensorChange: (fieldIndex: number, sensorIndex: number, sensor: string) => void;
  handleAddSensor: (fieldIndex: number) => void;
  handleRemoveSensor: (fieldIndex: number, sensorIndex: number) => void;
  handleAddField: () => void;
  handleRemoveField: (fieldIndex: number) => void;
  handleAddCrop: (fieldIndex: number) => void;
  handleRemoveCrop: (fieldIndex: number, cropIndex: number) => void;
  handleCropChange: (fieldIndex: number, cropIndex: number, crop: Crop | undefined) => void;
  handleGrowthStageChange: (fieldIndex: number, cropIndex: number, growthStage: string) => void;
}

const FieldList: React.FC<FieldListProps> = ({
  fields,
  handleFieldNameChange,
  handleSensorChange,
  handleAddSensor,
  handleRemoveSensor,
  handleAddField,
  handleRemoveField,
  handleAddCrop,
  handleRemoveCrop,
  handleCropChange,
  handleGrowthStageChange
}) => {
  return (
    <>
      {fields.map((field, index) => (
        <FieldItem
          key={index}
          field={field}
          fieldIndex={index}
          handleFieldNameChange={handleFieldNameChange}
          handleSensorChange={handleSensorChange}
          handleAddSensor={handleAddSensor}
          handleRemoveSensor={handleRemoveSensor}
          handleAddCrop={handleAddCrop}
          handleRemoveField={handleRemoveField}
          handleRemoveCrop={handleRemoveCrop}
          handleCropChange={handleCropChange}
          handleGrowthStageChange={handleGrowthStageChange}
        />
      ))}
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="outline"
        onClick={handleAddField}
      >
        Add Field
      </Button>
    </>
  );
};

export default FieldList;
