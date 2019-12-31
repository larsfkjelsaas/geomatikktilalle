import {
  analysisChosen,
  analysisTriggered,
  geometryCreateTriggered,
  layerExpanded,
  layerSelected,
  colorChange,
  geometryDeleteStarted,
  geometryDeleteFinalized,
  layersRearranged,
  layersRearrangedDone,
  layerVisibilityTrigger
} from "./geometryCaseReducers";
import { createReducer } from "./reducerUtilities";

export const initialGeometryState = {
  selectedAnalysis: "buffer",
  triggeredAnalysis: [],
  expandedLayer: -1,
  selectedLayers: [],
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
  LAYER_EXPANDED: layerExpanded,
  LAYER_SELECTED: layerSelected,
  DATA_LIST_REARRANGED: layersRearranged,
  LAYERS_REARRANGED_DONE: layersRearrangedDone,
  COLOR_CHANGE: colorChange,
  LAYER_VISIBILITY_TRIGGER: layerVisibilityTrigger
})