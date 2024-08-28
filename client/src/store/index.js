import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./slice/auth";
import subscription from "./slice/subscription";

const rootReducer = combineReducers({
  auth,
  subscription
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
