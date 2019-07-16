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

const analysisChoosen = analysisName => ({
  type: "ANLYSIS_CHOOSEN",
  payload: analysisName
});
const analysisTriggered = analysisName => ({
  type: "ANALYSIS_TRIGGERED",
  payload: analysisName
});

export const analysisActions = bindActionCreators(
  {
    analysisChoosen,
    analysisTriggered
  },
  store.dispatch
);
