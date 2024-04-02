import {ScenarioState} from "./state";

export enum Actions {
    SWITCH_SCENARIO = 'selection/switchScenario'
}

export const switch_scenario = (to: ScenarioState) => {
    return {
        type: Actions.SWITCH_SCENARIO,
        payload: to
    };
};
