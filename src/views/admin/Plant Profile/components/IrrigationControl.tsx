// src/components/IrrigationControl.tsx
import React, { useState } from 'react';
import { Button, Input, Checkbox, Stack, useTheme } from '@chakra-ui/react';
import CustomCard from '../../../../components/card/Card';

interface IrrigationControlProps {
  onStartIrrigation: (duration: number, manualOverride: boolean) => void;
}

const IrrigationControl: React.FC<IrrigationControlProps> = ({ onStartIrrigation }) => {
  const [duration, setDuration] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);
  const theme = useTheme();

  return (
    <CustomCard
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      p={4}
      maxW="sm"
      mx="auto"
    >
      <Stack spacing={4}>
        <Input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          variant="outline"
          size="lg"
          borderColor={theme.colors.gray[300]}
        />
        <Checkbox
          isChecked={manualOverride}
          onChange={(e) => setManualOverride(e.target.checked)}
        >
          Manual Override
        </Checkbox>
        <Button
          variant='brand'
          size="lg"
          onClick={() => onStartIrrigation(duration, manualOverride)}
        >
          Start Irrigation
        </Button>
      </Stack>
    </CustomCard>
  );
};

export default IrrigationControl;
