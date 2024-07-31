import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";
import secureLocalStorage from "react-secure-storage";
import { ADAM_EVE_API } from "../../services/apiConstant";

const slice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    message: "",
    isLoading: false,
  },
  reducers: {
    apiFetching: (state) => {
      state.isLoading = true;
    },
    userDataSuccess: (state, action) => {
      state.userData = action.payload.data;
      state.isLoading = false;
    },
    userDataFailed: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    apiFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export default slice.reducer;

/**********************ACTIONS************************************************ */
export const login = (requestParams, navigate) => async (dispatch) => {
  dispatch(apiFetching());
  api
    .post(`${ADAM_EVE_API.auth.login}`, requestParams)
    .then((response) => {
      let result = response.data;
      if (result.status) {
        secureLocalStorage.setItem(
          process.env.REACT_APP_TOKEN_STORAGE_KEY,
          result.token
        );
        secureLocalStorage.setItem(
          process.env.REACT_APP_USER_STORAGE_KEY,
          result.data
        );
        secureLocalStorage.setItem(
          process.env.REACT_APP_AUTH_STORAGE_KEY,
          true
        );
        // dispatch(userDataSuccess(result.data));
        navigate("/", true);
      } else {
        dispatch(userDataFailed(result.error));
        // toast.error(response.data.message);
      }
    })
    .catch(() => {
      dispatch(apiFailed());
    });
};


const { apiFetching, userDataFailed, apiFailed } =
  slice.actions;
