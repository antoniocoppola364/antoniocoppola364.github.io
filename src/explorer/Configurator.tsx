import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    Switch
} from '@mui/material';
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {useDispatch} from 'react-redux'
import {switch_scenario} from "./store/actions";
import scenarios from "./data/scenarios.json";

function ExpandMoreIcon() {
    return null;
}

export default function Configurator() {
    const dispatch = useDispatch()

    const [scenarioIndex, setScenarioIndex] = useState(0)

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(switch_scenario(scenarios[event.target.value as unknown as number]));
        setScenarioIndex(event.target.value as unknown as number)
    };

    return (
            <>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="scenario-select-label">Scenario</InputLabel>
                        <Select
                                labelId="scenario-select-label"
                                id="scenario-select"
                                value={(scenarioIndex || 0) as unknown as string}
                                label="Scenario"
                                onChange={handleChange}
                        >
                            {[...scenarios.entries()].map(item => (
                                    <MenuItem
                                            key={`scenario-select-${item[1].name.toLocaleLowerCase().replaceAll(" ", "_")}`}
                                            value={item[0]}>{item[1].name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Divider variant="fullWidth" sx={{my: 1}}/>
                </Box>
                <Box sx={{minWidth: 120}}>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                        >
                            <Typography>Setting Group 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography gutterBottom>Slider 1 label</Typography>
                            <Slider
                                    // aria-label="Temperature"
                                    defaultValue={80}
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                            />
                            <Typography gutterBottom>Slider 2 label</Typography>
                            <Slider
                                    // aria-label="Temperature"
                                    defaultValue={30}
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                        >
                            <Typography>
                                Setting Group 2
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked/>} label="Label"/>
                                <FormControlLabel required control={<Switch/>} label="Required"/>
                                <FormControlLabel disabled control={<Switch/>} label="Disabled"/>
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </>
    );
}