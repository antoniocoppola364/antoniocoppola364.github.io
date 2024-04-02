import 'leaflet/dist/leaflet.css';
import {Box, Grid, Tab, Tabs, useMediaQuery, useTheme} from '@mui/material';
import {BarPlot} from '@mui/x-charts/BarChart';
import {LinePlot} from '@mui/x-charts/LineChart';
import {ChartContainer} from '@mui/x-charts/ChartContainer';
import {AllSeriesType} from '@mui/x-charts/models';
import {ChartsXAxis} from '@mui/x-charts/ChartsXAxis';
import {ChartsYAxis} from '@mui/x-charts/ChartsYAxis';
import {MapContainer} from "react-leaflet";
import React from "react";
import Configurator from "./Configurator";
import LeafletMap from "./maps/LeafletMap";
import {useSelector} from "react-redux";
import {scenarioSelector} from "./store/selectors";
import Typography from "@mui/material/Typography";
import ConstructionIcon from '@mui/icons-material/Construction';

// Example from material ui x
const series = [
    {
        type: 'bar',
        stack: '',
        yAxisKey: 'eco',
        data: [2, 5, 3, 4, 1],
    },
    {
        type: 'bar',
        stack: '',
        yAxisKey: 'eco',
        data: [5, 6, 2, 8, 9],
    },
    {
        type: 'line',
        yAxisKey: 'pib',
        color: 'red',
        data: [1000, 1500, 3000, 5000, 10000],
    },
] as AllSeriesType[];

function ComposedChartExample() {
    return (
            <ChartContainer
                    series={series}
                    width={800}
                    height={400}
                    xAxis={[
                        {
                            id: 'years',
                            data: [2010, 2011, 2012, 2013, 2014],
                            scaleType: 'band',
                            valueFormatter: (value) => value.toString(),
                        },
                    ]}
                    yAxis={[
                        {
                            id: 'eco',
                            scaleType: 'linear',
                        },
                        {
                            id: 'pib',
                            scaleType: 'log',
                        },
                    ]}
            >
                <BarPlot/>
                <LinePlot/>
                <ChartsXAxis label="Years" position="bottom" axisId="years"/>
                <ChartsYAxis label="Results" position="left" axisId="eco"/>
                <ChartsYAxis label="PIB" position="right" axisId="pib"/>
            </ChartContainer>
    );
}


function LeafletExample() {
    let scenario = useSelector(scenarioSelector);
    return (
            <Box sx={{width: 800, height: 400}}>
                <MapContainer style={{height: 400}} center={[scenario.lat, scenario.lon]} zoom={scenario.zoom}
                              scrollWheelZoom={false}>
                    <LeafletMap scenario={scenario}/>
                </MapContainer>
            </Box>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
            <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`overview-tabpanel-${index}`}
                    aria-labelledby={`overview-tab-${index}`}
                    {...other}
            >
                {value === index && (
                        <Box sx={{p: 3}}>
                            {children}
                        </Box>
                )}
            </div>
    );
}

function tabProps(index: number) {
    return {
        id: `overview-tab-${index}`,
        'aria-controls': `overview-tabpanel-${index}`,
    };
}

// TODO: mobile friendly

export default function Overview() {
    const [selectedTab, setTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newTab: number) => {
        setTab(newTab);
    };

    const theme = useTheme();
    const isAtLeastTablet = useMediaQuery(theme.breakpoints.up("md"));

    if (isAtLeastTablet) {
        return (
                <Grid
                        container
                        // direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={2}
                >
                    <Grid item xs={3}>
                        <Configurator/>
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Item One" {...tabProps(0)} />
                                <Tab label="Item Two" {...tabProps(1)} />
                                <Tab label="Item Three" {...tabProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={selectedTab} index={0}>
                            <Box sx={{height: 400}}>
                                <ComposedChartExample/>
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={selectedTab} index={1}>
                            <LeafletExample/>
                        </CustomTabPanel>
                        <CustomTabPanel value={selectedTab} index={2}>
                            <Box sx={{height: 400}}>
                                Item Three
                            </Box>
                        </CustomTabPanel>
                    </Grid>
                </Grid>
        )
    } else {
        return (<Box display="flex" alignItems="center" gap={4} height={512.8} justifyContent="center">
            <ConstructionIcon/>
            <Typography>Data explorer not yet available for mobile mode.</Typography>
        </Box>)
    }
}
