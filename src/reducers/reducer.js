import { combineReducers } from "redux";

const initialState = {
  result: 1,
  lastValues: []
};

const mathReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      state = {
        ...state,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      break;
    case "SUBTRACT":
      state = {
        ...state,
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      break;
  }
  return state;
};

const initialAnalysisState = {
  currentAnalysis: "buffer",
  triggeredAnalyses: []
};

const analysisReducer = (state = initialAnalysisState, action) => {
  switch (action.type) {
    case "ANLYSIS_CHOOSEN":
      state = {
        ...state,
        currentAnalysis: action.payload,
        triggeredAnalyses: [...state.triggeredAnalyses, action.payload]
      };
      break;
    case "ANALYSIS_TRIGGERED":
      break;
  }
  return state;
};

const rootReducer = combineReducers({ math: mathReducer, analysis: analysisReducer });

export default rootReducer;
