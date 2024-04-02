import React, { useState } from 'react';
import { Box, Tab, Tabs, Switch, FormControlLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DataView from './DataView';
import MapView from './MapView';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props: { children?: React.ReactNode; index: any; value: any; }) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ display: value !== index ? 'none' : 'block' }}
      >
        {children}
      </div>
    );
  }

interface TabsContainerProps {
    scenario: string;
    time: string;
    compulsoryStopsValue: number;
    demandFactorValue: number;
    latestTimeFactorValue: number;
    walkingDistanceValue: number;
    mode: 'fixed' | 'semiflexible';
  }

  interface KPI {
    km_travel_distance: number;
    kWh_consumption_per_km: number; // Simplified identifier - Json identifier is not well formated!
    minutes_travel_time: number;
    num_total_request: number;
    num_served_requests: number;
    meters_total_walking_distance: number;
  }
  
  const TabsContainer: React.FC<TabsContainerProps> = ({ scenario, time, compulsoryStopsValue, demandFactorValue, latestTimeFactorValue, walkingDistanceValue, mode }) => {
    const [value, setValue] = useState(0);
    const [showServedRequests, setShowServedRequests] = useState(true);
    const [showUnservedRequests, setShowUnservedRequests] = useState(false);
    const [KPI, setKPI] = useState<KPI>({
        km_travel_distance: 0,
        kWh_consumption_per_km: 0,
        minutes_travel_time: 0,
        num_total_request: 0,
        num_served_requests: 0,
        meters_total_walking_distance: 0
      });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Map View" {...a11yProps(0)} />
                    <Tab label="Data View" {...a11yProps(1)} />
                    {/* Add more tabs as needed */}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box>
                <FormControlLabel
                    control={<Switch checked={showServedRequests} onChange={(e) => setShowServedRequests(e.target.checked)} />}
                    label="Show Served Requests"
                />
                <FormControlLabel
                    control={<Switch checked={showUnservedRequests} onChange={(e) => setShowUnservedRequests(e.target.checked)} />}
                    label="Show Unserved Requests"
                />
                </Box>
                <MapView
                scenario={scenario}
                time={time}
                compulsoryStopsValue={compulsoryStopsValue}
                demandFactorValue={demandFactorValue}
                latestTimeFactorValue={latestTimeFactorValue}
                walkingDistanceValue={walkingDistanceValue}
                showServedRequests={showServedRequests}
                showUnservedRequests={showUnservedRequests}
                mode={mode}
                setKPI={setKPI}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DataView kpi={KPI}/>
            </TabPanel>
            {/* Include other panels as necessary */}
        </Box>
    );
};
//                in MapView: mode={mode}
export default TabsContainer;
