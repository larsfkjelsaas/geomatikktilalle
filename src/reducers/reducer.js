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
    default:
      console.log("Invalid action type");
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
      console.log("analysis chosen");
      state = {
        ...state,
        currentAnalysis: action.payload,
        triggeredAnalyses: [...state.triggeredAnalyses, action.payload]
      };
      break;
    case "ANALYSIS_TRIGGERED":
      break;
    default:
      console.log("Invalid analysis action type");
      break;
  }
  return state;
};

const initialGeometryState = {
  geometries: []
};

const geometryReducer = (state = initialGeometryState, action) => {
  switch (action.type) {
    case "GEOMETRY_CREATE_NEW":
      state = {
        ...state,
        geometries: [...state.geometries, action.payload]
      };
      break;
    default:
      console.log("Invalid geometry action type");
      break;
  }

  return state;
};

const rootReducer = combineReducers({
  math: mathReducer,
  analysis: analysisReducer,
  geometry: geometryReducer
});

export default rootReducer;
