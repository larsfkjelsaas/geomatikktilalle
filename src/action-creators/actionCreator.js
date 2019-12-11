import { bindActionCreators } from "redux";

import store from "../store/store";

const doAdditionToCount = amount => ({ type: "ADD", payload: amount });
const doSubtractionToCount = amount => ({ type: "SUBTRACT", payload: amount });

export const mathActions = bindActionCreators(
  {
    add: doAdditionToCount,
    subtract: doSubtractionToCount
  },
  store.dispatch
);

export const analysisChoosen = analysisName => ({
  type: "ANLYSIS_CHOOSEN",
  payload: analysisName
});
export const analysisTriggered = value => ({
  type: "ANALYSIS_TRIGGERED",
  payload: { value: value }
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

export const geometryActions = bindActionCreators(
  {
    geometryCreateNew,
    geometryStartDeletion
  },
  store.dispatch
);
