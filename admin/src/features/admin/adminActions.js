// authActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../../config";
import { showNotification } from "../notification/notificationSlice";
import { handleError } from "../common";

const prefix = "/admin";

export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async ({ userToken, payload }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: { Authorization: `${userToken}` },
            };
            console.log(userToken, payload)
            const response = await axios.post(`${backendURL}${prefix}/user-update`, payload, config);
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