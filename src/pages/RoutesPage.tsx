import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import GeneralSelector from '../components/GeneralSelector';
import ScenarioSlider from '../components/ScenarioSlider';
import TabsContainer from '../components/TabsView/TabsContainer';

interface SliderMark {
    value: number;
    label: string;
}

interface SliderConfig {
    marks: SliderMark[];
    min: number;
    max: number;
    initialValue: number;
}

interface Option {
    value: string | number;
    label: string;
  }

interface SliderConfigs {
    compulsoryStops?: SliderConfig;
    demandFactor?: SliderConfig;
    latestTimeFactor?: SliderConfig;
    walkingDistance?: SliderConfig;
}

function formatTitle(title: string): string {
    const spaced = title.replace(/([A-Z])/g, ' $1').trim();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const RoutesPage: React.FC = () => {
    const [sliderConfigs, setSliderConfigs] = useState<SliderConfigs>({});

    // Define state hooks for each slider value
    const [compulsoryStopsValue, setCompulsoryStopsValue] = useState<number>(0);
    const [demandFactorValue, setDemandFactorValue] = useState<number>(0);
    const [latestTimeFactorValue, setLatestTimeFactorValue] = useState<number>(0);
    const [walkingDistanceValue, setWalkingDistanceValue] = useState<number>(0);
    const [scenarios, setScenarios] = useState<Option[]>([]);
    const [times, setTimes] = useState<Option[]>([]);
    const [selectedScenario, setSelectedScenario] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [mode, setMode] = useState<'fixed' | 'semiflexible'>('semiflexible');

    useEffect(() => {
        fetch('/data/sliderMarks.json')
            .then((response) => response.json())
            .then((data) => {
                const configs: SliderConfigs = {};
                Object.keys(data).forEach((key) => {
                    const marks: SliderMark[] = data[key];
                    const values = marks.map(mark => mark.value);
                    const range = Math.max(...values) - Math.min(...values);
                    configs[key as keyof SliderConfigs] = {
                        marks,
                        min: Math.min(...values) - range * 0.05,
                        max: Math.max(...values) + range * 0.05,
                        initialValue: values[0],
                    };

                    // Initialize slider values with first mark value
                    switch (key) {
                        case 'compulsoryStops':
                            setCompulsoryStopsValue(values[0]);
                            break;
                        case 'demandFactor':
                            setDemandFactorValue(values[0]);
                            break;
                        case 'latestTimeFactor':
                            setLatestTimeFactorValue(values[0]);
                            break;
                        case 'walkingDistance':
                            setWalkingDistanceValue(values[0]);
                            break;
                        default:
                            break;
                    }
                });
                setSliderConfigs(configs);
            })
            .catch((error) => console.error("Failed to load slider marks:", error));
    }, []);

    useEffect(() => {
        fetch('/data/selectorsConfig.json')
            .then(response => response.json())
            .then(data => {
                const scenariosOptions = data.scenarios.map((scenario: any) => ({
                    value: scenario.value,
                    label: scenario.label
                }));
                setScenarios(scenariosOptions);
                // Optionally initialize times for the first scenario
                //if (data.scenarios.length > 0) {
                    //setTimes(data.scenarios[0].times);
                    //setSelectedScenario(data.scenarios[0].value);
                //}
            })
            .catch(error => console.error("Failed to load config:", error));
    }, []);

    const handleScenarioChange = (value: string) => {
        setSelectedScenario(value);
        // Find the selected scenario and update times accordingly
        fetch('/data/selectorsConfig.json')
            .then(response => response.json())
            .then(data => {
                const selectedScen = data.scenarios.find((scenario: any) => scenario.value === value);
                if (selectedScen) {
                    setTimes(selectedScen.times);
                }
            })
            .catch(error => console.error("Failed to update times:", error));
    };

    const handleTimeChange = (value: string) => {
        setSelectedTime(value);
    };

    const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: 'fixed' | 'semiflexible') => {
        if (newMode !== null) {
            setMode(newMode);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Public Transit Routes
                        </Typography>
                        <Box sx={{ marginBottom: 2 }}>
                            <GeneralSelector label="Scenario" options={scenarios} onChange={handleScenarioChange} />
                            <Box sx={{ my: 2 }}>
                                <GeneralSelector label="Time" options={times} onChange={handleTimeChange} disabled={!selectedScenario} />
                            </Box>
                            <ToggleButtonGroup color="primary" value={mode} exclusive onChange={handleModeChange} sx={{ mb: 2, width: '100%' }}>
                                <ToggleButton value="fixed" sx={{ width: '50%' }}>Fixed</ToggleButton>
                                <ToggleButton value="semiflexible" sx={{ width: '50%' }}>Semiflexible</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        {Object.entries(sliderConfigs).map(([key, config]) =>
                            config ? (
                                <ScenarioSlider
                                    key={key}
                                    title={formatTitle(key)} // Hilfsfunktion
                                    min={config.min}
                                    max={config.max}
                                    initialValue={config.initialValue}
                                    onChange={(value: number) => {
                                        switch (key) {
                                            case 'compulsoryStops':
                                                setCompulsoryStopsValue(value);
                                                break;
                                            case 'demandFactor':
                                                setDemandFactorValue(value);
                                                break;
                                            case 'latestTimeFactor':
                                                setLatestTimeFactorValue(value);
                                                break;
                                            case 'walkingDistance':
                                                setWalkingDistanceValue(value);
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                    marks={config.marks}
                                />
                            ) : null
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <TabsContainer
                        scenario={selectedScenario}
                        time={selectedTime}
                        compulsoryStopsValue={compulsoryStopsValue}
                        demandFactorValue={demandFactorValue}
                        latestTimeFactorValue={latestTimeFactorValue}
                        walkingDistanceValue={walkingDistanceValue}
                        mode={mode}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default RoutesPage;



