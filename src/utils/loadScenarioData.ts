// src/utils/loadScenarioData.ts
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

interface KPI {
  km_travel_distance: number;
  kWh_consumption_per_km: number; // Simplified identifier - Json identifier is not well formated!
  minutes_travel_time: number;
  num_total_request: number;
  num_served_requests: number;
  meters_total_walking_distance: number;
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

interface ScenarioData {
  stops: Stop[];
  requests: Request[];
  kpi: KPI;
}

export async function loadScenarioData(scenario: string, time: string, compulsoryStopsValue: number, demandFactorValue: number, latestTimeFactorValue: number, walkingDistanceValue: number, mode: 'fixed' | 'semiflexible'): Promise<ScenarioData> {
  // Basispfad für Szenariodateien
  const basePath = '/data/scenarios/';
  // Standarddatei, die geladen wird, wenn die spezifische Datei nicht existiert
  const defaultScenarioFile = basePath + 'output_test22.json';

  // Anpassung für compulsoryStopsValue, wenn der Wert 0 ist
  const formattedCompulsoryStopsValue = compulsoryStopsValue === 0 ? "0.0" : compulsoryStopsValue === 1 ? "1.0" : compulsoryStopsValue.toString();

  // Generiere den Namen der spezifischen Datei basierend auf den Parametern
  const specificFileName = `${scenario}_${time}_comp_perc_${formattedCompulsoryStopsValue}_demand_factor_${demandFactorValue}_node_dist_200_compulsory_stop_dist_200_latest_tf_${latestTimeFactorValue}_proposed_tf_0.5_seed_0_walking_dist_${walkingDistanceValue}_util_value_1000_${mode}_results.json`;
  console.info("Current File: ");
  console.info(specificFileName);
  console.info("_____");
  const specificScenarioFile = basePath + specificFileName;

  if (scenario == '' || time == '') {
    console.warn("No scenario or time specified:");
    return { stops: [], requests: [],         kpi: { // Provide a default empty kpi object or adjust as necessary
      km_travel_distance: 0,
      kWh_consumption_per_km: 0,
      minutes_travel_time: 0,
      num_total_request: 0,
      num_served_requests: 0,
      meters_total_walking_distance: 0
    } };
  }

  try {
    let response = await fetch(specificScenarioFile);
    if (!response.ok) throw new Error('Specific scenario data could not be loaded');
    const data = await response.json();
    const kpiData: KPI = {
      km_travel_distance: data.kpi.km_travel_distance,
      kWh_consumption_per_km: data.kpi["kWh_consumption_1.5_kWh_x_km"], // Map from JSON property
      minutes_travel_time: data.kpi.minutes_travel_time,
      num_total_request: data.kpi.num_total_request,
      num_served_requests: data.kpi.num_served_requests,
      meters_total_walking_distance: data.kpi.meters_total_walking_distance,
    };
    return {
      stops: data.stops,
      requests: data.requests,
      kpi: kpiData // Include kpi data here
    };
  } catch (error) {
    console.warn("Loading default scenario data due to error:", error);
    try {
      const response = await fetch(defaultScenarioFile);
      if (!response.ok) throw new Error('Default scenario data could not be loaded');
      const data = await response.json();
      const kpiData: KPI = {
        km_travel_distance: data.kpi.km_travel_distance,
        kWh_consumption_per_km: data.kpi["kWh_consumption_1.5_kWh_x_km"], // Map from JSON property
        minutes_travel_time: data.kpi.minutes_travel_time,
        num_total_request: data.kpi.num_total_request,
        num_served_requests: data.kpi.num_served_requests,
        meters_total_walking_distance: data.kpi.meters_total_walking_distance,
      };
      return {
        stops: data.stops,
        requests: data.requests,
        kpi: kpiData // Make sure to include kpi data for the default file as well
      };
    } catch (defaultError) {
      console.error("Failed to load default scenario data:", defaultError);
      return {
        stops: [],
        requests: [],
        kpi: { // Provide a default empty kpi object or adjust as necessary
          km_travel_distance: 0,
          kWh_consumption_per_km: 0,
          minutes_travel_time: 0,
          num_total_request: 0,
          num_served_requests: 0,
          meters_total_walking_distance: 0
        }
      };
    }
  }
}