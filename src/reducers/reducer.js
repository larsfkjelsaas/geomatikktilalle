import { combineReducers } from "redux";
import { geometryReducer } from "./geometryReducer";

const rootReducer = combineReducers({
  geometry: geometryReducer
});

export default rootReducer;
