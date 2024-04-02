// src/components/RouteSelector.tsx
import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface RouteSelectorProps {
    onChange: (value: string) => void;
  }
  
  const RouteSelector: React.FC<RouteSelectorProps> = ({ onChange }) => {
    const [route, setRoute] = React.useState<string | number>('');

    const handleChange = (event: SelectChangeEvent<typeof route>) => {
        onChange(event.target.value as string)
        setRoute(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Route Scenario</InputLabel>
            <Select
                value={route}
                label="Route Scenario"
                onChange={handleChange}
            >
                {/* Populate with actual scenarios */}
                <MenuItem value={10}>Scenario 1</MenuItem>
                <MenuItem value={20}>Scenario 2</MenuItem>
                <MenuItem value={30}>Scenario 3</MenuItem>
            </Select>
        </FormControl>
    );
}

export default RouteSelector;
