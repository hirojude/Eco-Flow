import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface SensorListProps {
  sensors: string[];
}

const SensorList: React.FC<SensorListProps> = ({ sensors }) => {
  return (
    <Box>
      {sensors.map((sensor, index) => (
        <Text key={index}>{sensor}</Text>
      ))}
    </Box>
  );
};

export default SensorList;
