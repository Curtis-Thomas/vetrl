// src/redux/reducers/index.ts

import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  settings: settingsReducer,
});

export default rootReducer;
