import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { CircleMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { antPath } from 'leaflet-ant-path';
import { Box, Typography, Paper } from '@mui/material';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { loadScenarioData } from '../../utils/loadScenarioData'; // Update the path as necessary


interface Stop {
  node_id: number;
  order: number;
  latitude: number;
  longitude: number;
  is_compulsory_stop: boolean;
  name: string;
  earliest_time: string;
  latest_time: string;
  arrival_time: string;
}

interface Request {
  origin: {
    lat: number;
    lon: number;
  };
  destination: {
    lat: number;
    lon: number;
  };
  is_served: boolean;
}

interface KPI {
  km_travel_distance: number;
  kWh_consumption_per_km: number; // Simplified identifier - Json identifier is not well formated!
  minutes_travel_time: number;
  num_total_request: number;
  num_served_requests: number;
  meters_total_walking_distance: number;
}

interface AntPathComponentProps {
  stops: Stop[];
}

const AntPathComponent: React.FC<AntPathComponentProps> = ({ stops }) => {
  const map = useMap();

  useEffect(() => {
    if (stops.length > 0) {
      const sortedStops = stops.sort((a, b) => a.order - b.order);
      const latlngs = sortedStops.map(stop => [stop.latitude, stop.longitude]);

      const antPolyline = antPath(latlngs, {
          color: '#efefef',
          pulseColor: '#dc3545',
          delay: 680,
          dashArray: [3, 10],
          weight: 4,
          hardwareAccelerated: true,
      });

      antPolyline.addTo(map);

      return () => {
        map.removeLayer(antPolyline);
      };
    }
  }, [stops, map]);

  return null;
};

interface RequestPointsComponentProps {
  requests: Request[];
  showServedRequests: boolean;
  showUnservedRequests: boolean;
}

interface MarkerPair {
  originMarker: L.Marker;
  destinationMarker: CircleMarker;
}

const RequestPointsComponent: React.FC<RequestPointsComponentProps> = ({
  requests,
  showServedRequests,
  showUnservedRequests,
}) => {
  const map = useMap();

  useEffect(() => {
    if (Array.isArray(requests)) {
      const markers: MarkerPair[] = requests.reduce((acc: MarkerPair[], request) => {
        // Adjust colors for served and unserved requests (lighter fill, darker border)
        const fillColor = request.is_served ? '#007bff33' : '#add8e633'; // Using lighter fill (33 suffix for opacity)
        const borderColor = request.is_served ? '#007bff' : '#add8e6'; // Border color matches original color

        // Create a square icon for the origin with border
        const squareIcon = new L.DivIcon({
          className: 'custom-icon',
          html: `<svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                   <rect width="10" height="10" fill="${fillColor}" stroke="${borderColor}" stroke-width="6" />
                 </svg>`,
          iconSize: [16, 16],
        });

        if ((request.is_served && showServedRequests) || (!request.is_served && showUnservedRequests)) {
          // Add square marker for origin
          const originMarker = new L.Marker([request.origin.lat, request.origin.lon], { icon: squareIcon }).addTo(map);

          // Adjust destination circle marker color for consistency
          const destinationColor = request.is_served ? '#dc354533' : '#f0808033'; // Using opacity for lighter fill
          const destinationBorderColor = request.is_served ? '#dc3545' : '#f08080'; // Border color

          // Add circle marker for destination
          const destinationMarker = new L.CircleMarker([request.destination.lat, request.destination.lon], {
            color: destinationBorderColor,
            fillColor: destinationColor,
            fillOpacity: 1,
            radius: 5,
          }).addTo(map);

          acc.push({ originMarker, destinationMarker });
        }
        return acc;
      }, []);

      return () => {
        markers.forEach(({ originMarker, destinationMarker }) => {
          if (originMarker) map.removeLayer(originMarker);
          if (destinationMarker) map.removeLayer(destinationMarker);
        });
      };
    }
  }, [requests, showServedRequests, showUnservedRequests, map]);

  return null;
};

const CompulsoryStopsComponent: React.FC<{ stops: Stop[] }> = ({ stops }) => {

  return (
    <>
      {stops.map((stop, index) => {
        // Determine icon URL based on is_compulsory_stop
        const iconUrl = stop.is_compulsory_stop === false
          ? '/data/bus_op45.svg' // Placeholder for less visible icon
          : '/data/bus.svg'; // Default icon

        // Check if stop is either true or false for is_compulsory_stop
        if (stop.is_compulsory_stop !== null) {
          if (stop.is_compulsory_stop == true) {
            return (
              <Marker
                key={index}
                position={[stop.latitude, stop.longitude]}
                icon={new L.Icon({
                  iconUrl: iconUrl,
                  iconSize: [25, 25],
                })}
              >
                <Popup>
                  <div>
                    {stop.name}
                    <br />
                    {'Arrival Time: ' + stop.arrival_time}
                  </div>
                </Popup>
              </Marker>
            );
          } else {
            return (
              <Marker
                key={index}
                position={[stop.latitude, stop.longitude]}
                icon={new L.Icon({
                  iconUrl: iconUrl,
                  iconSize: [25, 25],
                })}
              >
              </Marker>
            );
          }
        }
        return null;
      })}
    </>
  );
};



const DynamicCenter: React.FC<{ stops: Stop[] }> = ({ stops }) => {
  const map = useMap();

  useEffect(() => {
    if (stops.length > 0) {
      const middleIndex = Math.floor(stops.length / 2);
      const middleStop = stops[middleIndex];
      map.flyTo([middleStop.latitude, middleStop.longitude], 13, {
        animate: true,
        duration: 0.7 // Dauer in Sekunden
      });
    }
  }, [stops, map]);

  return null;
};

interface MapViewProps {
  scenario: string;
  time: string;
  compulsoryStopsValue: number;
  demandFactorValue: number;
  latestTimeFactorValue: number;
  walkingDistanceValue: number;
  showServedRequests: boolean;
  showUnservedRequests: boolean;
  mode: 'fixed' | 'semiflexible';
  setKPI: (kpi: KPI) => void;
}

const Legend = () => {
  return (
    <Paper elevation={3} sx={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', padding: 2 }}>
      <Box sx={{ textAlign: 'left', marginX: 2 }}>
        <Typography variant="subtitle2">Served Requests</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ marginRight: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" fill="#007bff33" stroke="#007bff" stroke-width="2.5" />
              </svg>
            </div>
            <Typography variant="caption" sx={{ lineHeight: '16px' }}>Origin</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '4px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" fill="#dc354533" stroke="#dc3545" stroke-width="2.5" />
              </svg>
            </div>
            <Typography variant="caption" sx={{ lineHeight: '16px' }}>Destination</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'left', marginX: 2 }}>
        <Typography variant="subtitle2">Unserved Requests</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ marginRight: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" fill="#add8e633" stroke="#add8e6" stroke-width="2.5" />
              </svg>
            </div>
            <Typography variant="caption" sx={{ lineHeight: '16px' }}>Origin</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '4px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" fill="#f0808033" stroke="#f08080" stroke-width="2.5" />
              </svg>
            </div>
            <Typography variant="caption" sx={{ lineHeight: '16px' }}>Destination</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'left', marginX: 2 }}>
        <Typography variant="subtitle2">Stops</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <img src="/data/bus.svg" alt="Compulsory Stop" style={{ width: '20px', height: '20px', marginRight: '4px' }} />
            <Typography variant="caption" sx={{ lineHeight: '16px' }}>Compulsory Bus Stop</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <img src="/data/bus_op45.svg" alt="Optional Stop" style={{ width: '20px', height: '20px', marginRight: '4px' }} />
            <Typography variant="caption" sx={{ lineHeight: '16px' }}>Optional Bus Stop</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};



const MapView: React.FC<MapViewProps> = ({ scenario, time, compulsoryStopsValue, demandFactorValue, latestTimeFactorValue, walkingDistanceValue, showServedRequests, showUnservedRequests, mode, setKPI }) => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [showComponents, setShowComponents] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponents(true);
    }, 800); // Setzt showComponents nach 800ms auf true
  
    return () => clearTimeout(timer); // Bereinigen des Timers beim Unmount
  }, []); // Leeres Array als Abhängigkeit, damit dieser Effekt nur beim Mounten ausgelöst wird
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadScenarioData(scenario, time, compulsoryStopsValue, demandFactorValue, latestTimeFactorValue, walkingDistanceValue, mode);
      setStops(data.stops);
      setRequests(data.requests);
      setKPI(data.kpi)
    };

    fetchData();
  }, [scenario, time, compulsoryStopsValue, demandFactorValue, latestTimeFactorValue, walkingDistanceValue, mode]);

  return (
    <>
      <style>
        {`
          .leaflet-control-attribution {
            display: none !important;
          }
        `}
      </style>
      <MapContainer center={[48.1351, 11.5820]} zoom={14} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'"
          attribution=''
        />
          {/* 
          Currently NO ATTRIBUTION! - Consider changing before Release
          Consider using different Tile Provider:
            - OpenStreetMap (doesnt look nice in my opinion)
            - Current: CartoDB.VoyagerLabelsUnder - similar to google maps
          */}
        <DynamicCenter stops={stops} />
        {showComponents && <AntPathComponent stops={stops} />}
        {showComponents && <RequestPointsComponent requests={requests} showServedRequests={showServedRequests} showUnservedRequests={showUnservedRequests} />}
        {showComponents && <CompulsoryStopsComponent stops={stops.filter(stop => stop.is_compulsory_stop !== null)} />}
      </MapContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Legend />
      </Box>
    </>
  );
};

export default MapView;

          
          
