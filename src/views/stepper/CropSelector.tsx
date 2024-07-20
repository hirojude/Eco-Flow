import React, { useState, useEffect } from "react";
import { Select, Box, Text } from "@chakra-ui/react";
import cropsData from "../../data/updated_crops.json";

interface Crop {
  CropId: number;
  name: string;
  localName: string;
}

interface CropSelectorProps {
  fieldIndex: number;
  cropIndex: number;
  handleCropChange: (fieldIndex: number, cropIndex: number, crop: Crop | undefined) => void;
  selectedCrop: Crop;
}

const CropSelector: React.FC<CropSelectorProps> = ({ fieldIndex, cropIndex, handleCropChange, selectedCrop }) => {
  const [crops, setCrops] = useState<Crop[]>([]);

  useEffect(() => {
    const sortedCrops = (cropsData.Crops || []).sort((a: Crop, b: Crop) => a.name.localeCompare(b.name));
    setCrops(sortedCrops);
  }, []);

  const onCropChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cropName = event.target.value;
    const crop = crops.find(crop => crop.name === cropName);
    handleCropChange(fieldIndex, cropIndex, crop);
  };

  return (
    <Box>
      <Select placeholder="Select crop" onChange={onCropChange} value={selectedCrop.name}>
        {crops.map((crop) => (
          <option key={crop.CropId} value={crop.name}>
            {crop.name}
          </option>
        ))}
      </Select>
      {selectedCrop && (
        <Text mt={2}>Local Name: {selectedCrop.localName}</Text>
      )}
    </Box>
  );
};

export default CropSelector;
