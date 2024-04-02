import {ExplorerState} from "./state";

const scenarioSelector = (state: ExplorerState) => {
    return state.scenario;
}

export {scenarioSelector};