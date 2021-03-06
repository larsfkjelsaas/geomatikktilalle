import { bindActionCreators } from "redux";

import store from "../store/store";

export const analysisChoosen = analysisName => ({
  type: "ANLYSIS_CHOOSEN",
  payload: analysisName
});
export const analysisTriggered = analysis => ({
  type: "ANALYSIS_TRIGGERED",
  payload: analysis
});

export const analysisActions = bindActionCreators(
  {
    analysisChoosen,
    analysisTriggered
  },
  store.dispatch
);

export const geometryCreateNew = geometry => ({
  type: "GEOMETRY_CREATE_TRIGGERED",
  payload: geometry
});
export const geometryStartDeletion = name => ({
  type: "GEOMETRY_DELETE_STARTED",
  payload: name
});

export const geomatryFinalizeDeletion = () => ({
  type: "GEOMETRY_DELETE_FINALIZED"
});

export const expandLayer = index => ({
  type: "LAYER_EXPANDED",
  payload: index
});

export const selectLayer = name => ({
  type: "LAYER_SELECTED",
  payload: name
});


export const selectColor = hex => ({
  type: "COLOR_CHANGE",
  payload: hex
});

export const dataLayerDragEnd = result => ({
  type: "DATA_LIST_REARRANGED",
  payload: result
});

export const layerVisibilityTrigger = layer => ({
  type: "LAYER_VISIBILITY_TRIGGER",
  payload: layer
})

export const geometryActions = bindActionCreators(
  {
    geometryCreateNew,
    geometryStartDeletion,
    geomatryFinalizeDeletion,
    expandLayer,
    selectLayer,
    selectColor,
    dataLayerDragEnd,
    layerVisibilityTrigger
  },
  store.dispatch
);

export const fileUploaded = files => ({
  type: "GEOMETRY_CREATE_TRIGGERED",
  payload: JSON.parse(files)
});

export const fileActions = bindActionCreators(
  {
    fileUploaded
  },
  store.dispatch
);
