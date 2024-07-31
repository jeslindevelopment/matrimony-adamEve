import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./slice/auth";

const rootReducer = combineReducers({
  auth,

});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
