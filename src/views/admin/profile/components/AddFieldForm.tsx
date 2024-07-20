import React, { useState } from 'react';
import { db } from '../../../../config/firebaseConfig'; // Adjust the path as necessary
import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Button, Input, VStack } from '@chakra-ui/react';

interface AddFieldFormProps {
  userId: string;
  onFieldAdded: () => void; // Callback to refresh fields after adding a new one
}

const AddFieldForm: React.FC<AddFieldFormProps> = ({ userId, onFieldAdded }) => {
  const [fieldName, setFieldName] = useState('');

  const handleAddField = async () => {
    if (fieldName.trim() === '') return;

    const userRef = doc(collection(db, 'users'), userId);
    await updateDoc(userRef, {
      fields: arrayUnion({
        name: fieldName,
        sensors: [],
        crops: []
      })
    });

    setFieldName('');
    onFieldAdded(); // Refresh fields
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Field Name"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
      />
      <Button onClick={handleAddField}>Add Field</Button>
    </VStack>
  );
};

export default AddFieldForm;
