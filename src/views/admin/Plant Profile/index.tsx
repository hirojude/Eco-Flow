// src/pages/PlantProfile.tsx
import React, { useState, useEffect } from 'react';
import { Box,  Spinner, SimpleGrid, Divider, VStack, useTheme, Center } from '@chakra-ui/react';
import FieldSelector from './components/FieldSelector';
import PlantInfo from './components/PlantInfo';
import SensorReadings from './components/SensorReadings';
import IrrigationControl from './components/IrrigationControl';
import IrrigationLogs from './components/IrrigationLogs';
import { Field, Plant, Sensor, IrrigationLog } from './types';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { useAuth } from '../../../contexts/AuthProvider';

const PlantProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<string>('');
  const [plant, setPlant] = useState<Plant | null>(null);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [logs, setLogs] = useState<IrrigationLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        const data = doc.data() as { fields: Field[] };
        console.log('Fetched user data:', data);
        setFields(data.fields || []);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedField) {
      console.log('Selected field name:', selectedField);
      const selectedFieldData = fields.find(field => field.name === selectedField);
      console.log('Selected field data:', selectedFieldData);
      if (selectedFieldData) {
        setPlant(selectedFieldData.crops ? selectedFieldData.crops[0] : null);
        setSensors(selectedFieldData.sensors || []);
        setLogs(selectedFieldData.irrigationLogs || []); // Assuming irrigationLogs exists in the selectedFieldData
      }
    }
  }, [selectedField, fields]);

  const handleStartIrrigation = (duration: number, manualOverride: boolean) => {
    // Start irrigation logic
    console.log(`Starting irrigation for ${duration} minutes with manual override ${manualOverride}`);
  };

  if (loading) {
    return (
      <Box textAlign="center" pt="130px">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: 4, md: 8 }}>
      <VStack spacing={6} align="stretch" mt={10}>
        <FieldSelector fields={fields} selectedField={selectedField} onSelectField={setSelectedField} />

        {plant && (
          <Box borderWidth="1px" borderRadius="md" boxShadow="md" p={4} borderColor='brand.500'>
            <Center>
              <PlantInfo
                name={plant.name}
                image={plant.image}
                growthStage={plant.growthStage}
                progress={plant.progress}
              />
            </Center>
            <Divider my={4} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
          <Box borderWidth="1px" borderRadius="md" boxShadow="md" p={4} >
            <SensorReadings
              temperature={sensors.find(sensor => sensor.type === 'temperature')?.value || 0}
              humidity={sensors.find(sensor => sensor.type === 'humidity')?.value || 0}
              soilMoisture={sensors.find(sensor => sensor.type === 'soilMoisture')?.value || 0}
            />
          </Box>
          <Box borderWidth="1px" borderRadius="md" boxShadow="md" p={4} >
            <IrrigationControl onStartIrrigation={handleStartIrrigation} />
          </Box>
          <Box borderWidth="1px" borderRadius="md" boxShadow="md" p={4} >
            <IrrigationLogs logs={logs} />
          </Box>
        </SimpleGrid>
          </Box>
        )}

      </VStack>
    </Box>
  );
};

export default PlantProfile;
