// src/components/IrrigationLogs.tsx
import React from 'react';
import { Box, Text, Stack, useTheme } from '@chakra-ui/react';
import CustomCard from '../../../../components/card/Card';

interface IrrigationLog {
  timestamp: string;
  amount: number;
}

interface IrrigationLogsProps {
  logs: IrrigationLog[];
}

const IrrigationLogs: React.FC<IrrigationLogsProps> = ({ logs }) => {
  const theme = useTheme();

  return (
    <CustomCard
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      p={4}
      maxW="md"
      mx="auto"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Irrigation Logs
      </Text>
      {logs.length === 0 ? (
        <Text>No logs available</Text>
      ) : (
        <Stack spacing={4}>
          {logs.map((log, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              p={3}
              bg={theme.colors.gray[50]}
            >
              <Text fontSize="md" fontWeight="medium">
                {log.timestamp}
              </Text>
              <Text fontSize="sm" color={theme.colors.gray[600]}>
                {log.amount} liters
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </CustomCard>
  );
};

export default IrrigationLogs;
