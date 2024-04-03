import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, PieChart, Pie, Cell, TooltipProps } from 'recharts';

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

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p>{`${payload[0].name}: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

const DataView: React.FC<DataViewProps> = ({ kpi }) => {
  const data = [
    {
      name: '',
      name2: 'KM Travel Distance',
      value: kpi.km_travel_distance,
      fill: '#8884d8',
    },
    {
      name: '',
      name2: 'kWh Consumption per KM',
      value: kpi.kWh_consumption_per_km,
      fill: '#82ca9d',
    },
    {
      name: '',
      name2: 'Minutes Travel Time',
      value: kpi.minutes_travel_time,
      fill: '#ffc658',
    },
    {
      name: '',
      name2: 'Meters Walking Distance',
      value: kpi.meters_total_walking_distance / 1000, // converting meters to kilometers
      fill: '#ff8042',
    },
  ];

    // Custom legend items based on the data array
    const legendPayload = data.map((item) => ({
      value: item.name2, // Using the name2 field for the legend label
      type: 'rect', // Shape of the legend marker
      color: item.fill, // Color of the legend marker
      id: item.name2,
    }));

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
          <BarChart
            data={data}
            layout="horizontal"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <YAxis type="number" domain={[0, 40]} />
            <XAxis type="category" dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              payload={legendPayload}
              align="left" // Aligns the legend to the left
              wrapperStyle={{ position: 'relative', left: 85, bottom: 100 }} // Adjust positioning as needed
            />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="30%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend align="left" verticalAlign="bottom" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataView;
