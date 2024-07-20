import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface CropListProps {
  crops: string[];
}

const CropList: React.FC<CropListProps> = ({ crops }) => {
  return (
    <Box>
      {crops.map((crop, index) => (
        <Text key={index}>{crop}</Text>
      ))}
    </Box>
  );
};

export default CropList;
