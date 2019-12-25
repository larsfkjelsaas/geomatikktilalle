import {
  analysisChosen,
  analysisTriggered,
  geometryCreateTriggered,
  layerSelected,
  colorChange,
  geometryDeleteStarted,
  geometryDeleteFinalized,
  layersRearranged,
  layersRearrangedDone
} from "./geometryCaseReducers";
import { createReducer } from "./reducerUtilities";

export const initialGeometryState = {
  selectedAnalysis: "buffer",
  triggeredAnalyses: [],
  selectedLayer: -1,
  layers: [],
  layersToDelete: [],
  layerToMove: -1,
  activeColor: "#001eff"
};

export const geometryReducer = createReducer(initialGeometryState, {
  ANALYSIS_CHOSEN: analysisChosen,
  ANALYSIS_TRIGGERED: analysisTriggered,
  GEOMETRY_CREATE_TRIGGERED: geometryCreateTriggered,
  GEOMETRY_DELETE_STARTED: geometryDeleteStarted,
  GEOMETRY_DELETE_FINALIZED: geometryDeleteFinalized,
  LAYER_SELECTED: layerSelected,
  DATA_LIST_REARRANGED: layersRearranged,
  LAYERS_REARRANGED_DONE: layersRearrangedDone,
  COLOR_CHANGE: colorChange,
})