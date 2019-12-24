import { combineReducers } from "redux";
import { geometryReducer } from "./geometryReducer";
import { fileReducer } from "./fileReducer";

const rootReducer = combineReducers({
  geometry: geometryReducer,
  file: fileReducer
});

export default rootReducer;
