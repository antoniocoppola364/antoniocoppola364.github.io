import {Actions} from "./actions";
import {initScenarioState} from "./state";

// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
const scenarioReducer = (state = initScenarioState, action: any) => {
    switch (action.type) {
        case Actions.SWITCH_SCENARIO:
            return {
                ...state,
                name: action.payload.name,
                lat: action.payload.lat,
                lon: action.payload.lon,
                zoom: action.payload.zoom,
                instance: action.payload.instance,
            };
        default:
            return state;
    }
};

export {scenarioReducer};