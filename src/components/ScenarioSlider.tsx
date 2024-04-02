import * as React from 'react';
import { Typography, Slider } from '@mui/material';

interface Mark {
    value: number;
    label?: string;
}

interface ScenarioSliderProps {
    title: string;
    min: number;
    max: number;
    initialValue: number;
    onChange: (value: number) => void;
    marks: Mark[];
}

const ScenarioSlider: React.FC<ScenarioSliderProps> = ({ title, min, max, initialValue, onChange, marks }) => {
    const [value, setValue] = React.useState<number>(initialValue);

    const handleChange = (event: Event, newValue: number | number[]) => {
        let value = Array.isArray(newValue) ? newValue[0] : newValue;
        const closest = marks.reduce((prev, curr) => Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev).value;
        
        setValue(closest);
        onChange(closest);
    };

    return (
        <div>
            <Typography gutterBottom>{title}</Typography>
            <Slider
                value={value}
                min={min}
                max={max}
                marks={marks}
                valueLabelDisplay="auto"
                onChange={handleChange}
                step={null}
            />
        </div>
    );
}

export default ScenarioSlider;
