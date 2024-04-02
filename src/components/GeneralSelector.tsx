// src/components/GeneralSelector.tsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Option {
  value: string | number;
  label: string;
}

interface GeneralSelectorProps {
  label: string;
  options: Option[];
  onChange: (value: string) => void;
  disabled?: boolean; // Add this line
}

const GeneralSelector: React.FC<GeneralSelectorProps> = ({ label, options, onChange, disabled = false }) => {
  const [selectedValue, setSelectedValue] = React.useState<string | number>('');

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
      onChange(event.target.value as string);
      setSelectedValue(event.target.value);
  };

  return (
      <FormControl fullWidth disabled={disabled}>
          <InputLabel>{label}</InputLabel>
          <Select
              value={selectedValue}
              label={label}
              onChange={handleChange}
          >
              {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
          </Select>
      </FormControl>
  );
}

export default GeneralSelector;
