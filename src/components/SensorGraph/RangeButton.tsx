import React from 'react';
import { Button } from '@chakra-ui/react';

interface RangeButtonProps {
  label: string;
  onClick: () => void;
}

const RangeButton: React.FC<RangeButtonProps> = ({ label, onClick }) => {
  return (
    <Button onClick={onClick} mr="5px">
      {label}
    </Button>
  );
};

export default RangeButton;
