// authActions.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../../config";
import { showNotification } from "../notification/notificationSlice";
import { getUsers } from "../user/userActions";

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
            dispatch(getUsers({ userToken, size: 10, page: 1 }))
            dispatch(showNotification({
                message: response.data.message,
                type: "success"
            }))
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

export const getUserDetail = createAsyncThunk(
    "admin/detail",
    async ({ userToken, id }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: { Authorization: `${userToken}` },
            };
            const response = await axios.get(`${backendURL}${prefix}/user-details/${id}`, config);
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

export const getSubscriptionDetail = createAsyncThunk(
    "admin/subscription-detail",
    async ({ userToken, id }, { rejectWithValue, dispatch }) => {
        try {
            const config = {
                headers: { Authorization: `${userToken}` },
            };
            const response = await axios.get(`${backendURL}${prefix}/subscription-detail/${id}`, config);
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