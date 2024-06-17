// src/redux/reducers/index.ts

import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
});

export default rootReducer;
