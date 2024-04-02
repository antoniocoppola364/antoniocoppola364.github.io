import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts';

interface KPI {
  km_travel_distance: number;
  kWh_consumption_per_km: number;
  minutes_travel_time: number;
  num_total_request: number;
  num_served_requests: number;
  meters_total_walking_distance: number;
}

interface DataViewProps {
  kpi: KPI;
}

const DataView: React.FC<DataViewProps> = ({ kpi }) => {
  // Convert the KPI object into an array for the bar chart
  const barChartData = [
    {
      name: 'KPI',
      'KM Travel Distance': kpi.km_travel_distance,
      'kWh Consumption per KM': kpi.kWh_consumption_per_km,
      'Minutes Travel Time': kpi.minutes_travel_time,
      'Meters Walking Distance': kpi.meters_total_walking_distance / 1000, // converting meters to kilometers for consistent scale
    },
  ];

  // Pie chart data for requests
  const pieChartData = [
    { name: 'Served Requests', value: kpi.num_served_requests },
    { name: 'Unserved Requests', value: kpi.num_total_request - kpi.num_served_requests },
  ];

  return (
    <div>
      <h2>Data View</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <ResponsiveContainer width="50%" height={300}>
          <BarChart data={barChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="KM Travel Distance" fill="#8884d8" />
            <Bar dataKey="kWh Consumption per KM" fill="#82ca9d" />
            <Bar dataKey="Minutes Travel Time" fill="#ffc658" />
            <Bar dataKey="Meters Walking Distance" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="30%" height={300}>
          <PieChart>
            <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataView;
