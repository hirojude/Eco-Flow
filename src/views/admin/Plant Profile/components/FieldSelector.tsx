// src/components/FieldSelector.tsx
import React from 'react';
import { Select } from '@chakra-ui/react';

interface FieldSelectorProps {
  fields: { name: string }[];
  selectedField: string;
  onSelectField: (fieldName: string) => void;
}

const FieldSelector: React.FC<FieldSelectorProps> = ({ fields, selectedField, onSelectField }) => {
  return (
    <Select value={selectedField} onChange={(e) => onSelectField(e.target.value)} placeholder="Select field" w="100%" textAlign="center" borderColor='brand.500' >
      {fields.map((field) => (
        <option key={field.name} value={field.name} color='brand.500'>
          {field.name}
        </option>
      ))}
    </Select>
  );
};

export default FieldSelector;
