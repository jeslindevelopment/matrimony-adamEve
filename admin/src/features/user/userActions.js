// authActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../../config";
import { showNotification } from "../notification/notificationSlice";
import { handleError } from "../common";

const prefix = "/user";

export const getUsers = createAsyncThunk(
    "user/list",
    async ({ userToken, size, page }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: { Authorization: `${userToken}` },
            };
            const response = await axios.get(`${backendURL}${prefix}/list?size=${size}&page=${page}`, config);
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

export const getOtherUserDetail = createAsyncThunk(
    "user/otheruser",
    async ({ userToken, id }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: { Authorization: `${userToken}` },
            };
            const response = await axios.get(`${backendURL}${prefix}/${id}`, config);
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