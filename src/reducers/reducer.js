import { combineReducers } from "redux";
import { geometryReducer } from "./geometryReducer";
import { fileReducer } from "./fileReducer";

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
      break;
  }
  return state;
};

const rootReducer = combineReducers({
  math: mathReducer,
  geometry: geometryReducer,
  file: fileReducer
});

export default rootReducer;
