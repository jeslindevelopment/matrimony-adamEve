import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./slice/auth";
import subscription from "./slice/subscription";
import message from "./slice/message"
const rootReducer = combineReducers({
  auth,
  subscription,
  message
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
