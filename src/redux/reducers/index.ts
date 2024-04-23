// src/redux/reducers/index.ts

import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  // other reducers...
});

export default rootReducer;
