import React from 'react';
import { Input, Flex, Text } from '@chakra-ui/react';

interface ThresholdInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ThresholdInput: React.FC<ThresholdInputProps> = ({ label, name, value, onChange }) => {
  return (
    <Flex flexDirection="column" mr="5px">
      <Text>{label}</Text>
      <Input type="number" placeholder={label} name={name} value={value} onChange={onChange} />
    </Flex>
  );
};

export default ThresholdInput;
