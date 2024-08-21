// authActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../../config";
import { showNotification } from "../notification/notificationSlice";
import { handleError } from "../common";

const prefix = "/auth";

export const setSpinnerLoader = createAsyncThunk(
  "auth/setSpinnerLoader",
  async (spinner, { rejectWithValue, dispatch }) => {
    try {
      return spinner;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setSignupState = createAsyncThunk(
  "auth/setSignupState",
  async ({ role }, { rejectWithValue, dispatch }) => {
    try {
      return role;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, { rejectWithValue, dispatch }) => {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append('username', email);
      if (password) {
        bodyFormData.append('password', password);
      }
      const response = await axios.post(`${backendURL}${prefix}/login`, bodyFormData,
        { headers: { "Content-Type": "multipart/form-data" } });
      dispatch(
        showNotification({
          message: "Logged in successfully",
          type: "success",
        })
      );
      return response.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.detail) {
        dispatch(
          showNotification({
            message: error.response.data.detail,
            type: "danger",
          })
        );
        return rejectWithValue(error.response.data.detail);
      } else {
        dispatch(
          showNotification({
            message: error.message,
            type: "danger",
          })
        );
        return rejectWithValue(error.message);
      }
    }
  }
);

// logout 
export const logout = createAsyncThunk(
  "auth/logout",
  async ({ userToken, email }, { rejectWithValue, dispatch, getState }) => {
    try {
      const config = {
        headers: { "Authorization": `Bearer ${userToken}` }
      }
      const response = await axios.post(
        `${backendURL}${prefix}/logout?user_email=${email}`, {}, config
      );
      if (!response.error) {
        dispatch(
          showNotification({
            message: "Logged out successfully",
            type: "success",
          })
        );
      }
      return response.data;
    } catch (error) {
      handleError({ error, rejectWithValue, dispatch, getState })
    }
  }
);
