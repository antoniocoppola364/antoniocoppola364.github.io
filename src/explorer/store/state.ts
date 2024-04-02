import scenarios from "../data/scenarios.json"

export interface ExplorerState {
    scenario: ScenarioState,
    // filters: {
    //     status: string,
    //     colors: string[]
    // }
}

export interface ScenarioState {
    name: string,
    lat: number,
    lon: number,
    zoom: number,
    instance: string,
}


export const initScenarioState: ScenarioState = {
    name: scenarios[0].name,
    lat: scenarios[0].lat,
    lon: scenarios[0].lon,
    zoom: scenarios[0].zoom,
    instance: scenarios[0].instance,
}

export const initExplorerState: ExplorerState = {
    scenario: initScenarioState,
    // filters: {
    //     status: 'Active',
    //     colors: ['red', 'blue']
    // }
}