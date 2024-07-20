import React, { useEffect, useState } from 'react';
import { db } from '../../../config/firebaseConfig'; // Adjust the path as necessary
import { useAuth } from '../../../contexts/AuthProvider'; // Adjust the path as necessary
import { Box, SimpleGrid, Skeleton, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import FieldList from './components/FieldList'; // Adjust the path as necessary
import Banner from './components/Banner';
import { Field, Crop, UserData } from './components/types'; // Adjust the path as necessary
import banner from '../../../assets/img/auth/banner.png';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<Field[]>([]);
  const [sensornum, setSensornum] = useState<number>(0);
  const [cropnum, setCropnum] = useState<number>(0);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        const data = doc.data() as UserData;
        setUserData(data);
        setFields(data.fields || []);
        setSensornum(data.fields.reduce((acc, field) => acc + field.sensors.length, 0));
        setCropnum(data.fields.reduce((acc, field) => acc + field.crops.length, 0));
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleFieldNameChange = (index: number, name: string) => {
    const newFields = [...fields];
    newFields[index].name = name;
    setFields(newFields);
    setChangesMade(true);
  };

  const handleSensorChange = (fieldIndex: number, sensorIndex: number, sensor: string) => {
    const newFields = [...fields];
    newFields[fieldIndex].sensors[sensorIndex] = sensor;
    setFields(newFields);
    setChangesMade(true);
  };

  const handleAddSensor = (fieldIndex: number) => {
    const newFields = [...fields];
    newFields[fieldIndex].sensors.push('');
    setFields(newFields);
    setChangesMade(true);
  };

  const handleRemoveSensor = (fieldIndex: number, sensorIndex: number) => {
    const newFields = [...fields];
    newFields[fieldIndex].sensors.splice(sensorIndex, 1);
    setFields(newFields);
    setChangesMade(true);
  };

  const handleAddField = () => {
    setFields([...fields, { name: '', sensors: [], crops: [] }]);
    setChangesMade(true);
  };

  const handleRemoveField = (fieldIndex: number) => {
    const newFields = [...fields];
    newFields.splice(fieldIndex, 1);
    setFields(newFields);
    setChangesMade(true);
    setShowDeleteAlert(true);
    setTimeout(() => setShowDeleteAlert(false), 3000); // Hide alert after 3 seconds
  };

  const handleAddCrop = (fieldIndex: number) => {
    const newFields = [...fields];
    newFields[fieldIndex].crops.push({ CropId: Date.now(), name: '', localName: '', growthStage: '' });
    setFields(newFields);
    setChangesMade(true);
  };

  const handleRemoveCrop = (fieldIndex: number, cropIndex: number) => {
    const newFields = [...fields];
    newFields[fieldIndex].crops.splice(cropIndex, 1);
    setFields(newFields);
    setChangesMade(true);
  };

  const handleCropChange = (fieldIndex: number, cropIndex: number, crop: Crop | undefined) => {
    if (crop) {
      const newFields = [...fields];
      newFields[fieldIndex].crops[cropIndex] = crop;
      setFields(newFields);
      setChangesMade(true);
    }
  };

  const handleGrowthStageChange = (fieldIndex: number, cropIndex: number, growthStage: string) => {
    const newFields = [...fields];
    newFields[fieldIndex].crops[cropIndex].growthStage = growthStage;
    setFields(newFields);
    setChangesMade(true);
  };

  const handleSaveChanges = async () => {
    if (currentUser && changesMade) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { fields });
      setChangesMade(false);
      setShowSaveAlert(true);
      setTimeout(() => setShowSaveAlert(false), 3000); // Hide alert after 3 seconds
    }
  };

  return (<>
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      
      <Banner
        gridArea="1 / 1 / 2 / 2"
        banner={banner}
        fields={fields.length}
        sensornum={sensornum}
        cropnum={cropnum}
      />

      <Skeleton isLoaded={!loading} borderRadius={20}>
        {userData && (
          <SimpleGrid mt={5} columns={{base:1, md:2}} gap={5}>
            <FieldList
              fields={fields}
              handleFieldNameChange={handleFieldNameChange}
              handleSensorChange={handleSensorChange}
              handleAddSensor={handleAddSensor}
              handleRemoveSensor={handleRemoveSensor}
              handleAddField={handleAddField}
              handleRemoveField={handleRemoveField}
              handleAddCrop={handleAddCrop}
              handleRemoveCrop={handleRemoveCrop}
              handleCropChange={handleCropChange}
              handleGrowthStageChange={handleGrowthStageChange}
            />
          </SimpleGrid>
        )}
      </Skeleton>

      {showSaveAlert && (
        <Alert status="success" position="fixed" bottom="10px" right="10px" justifyContent="center">
          <AlertIcon />
          Data saved
        </Alert>
      )}

      {showDeleteAlert && (
        <Alert status="error" position="fixed" bottom="10px" right="10px" justifyContent="center">
          <AlertIcon />
          Field removed
        </Alert>
      )}

      {changesMade && (
        <Button
          colorScheme="teal"
          variant='brand'
          onClick={handleSaveChanges}
          position="fixed"
          bottom="20px"
          right="20px"
        >
          Save Changes
        </Button>
      )}
    </Box></>
  );
};

export default ProfilePage;
