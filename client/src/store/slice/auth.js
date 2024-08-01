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
  reducers: {},
});

export default slice.reducer;

/**********************ACTIONS************************************************ */
export const userlogin = (requestParams, navigate) => async (dispatch) => {
  api
    .post(`${ADAM_EVE_API.auth.login}`, requestParams)
    .then((response) => {
      let result = response.data;
      console.log("result", result);
      if (result.status) {
        // secureLocalStorage.setItem(
        //   process.env.REACT_APP_TOKEN_STORAGE_KEY,
        //   result.token
        // );
        // secureLocalStorage.setItem(
        //   process.env.REACT_APP_USER_STORAGE_KEY,
        //   result.data
        // );
        // secureLocalStorage.setItem(
        //   process.env.REACT_APP_AUTH_STORAGE_KEY,
        //   true
        // );
        // dispatch(userDataSuccess(result.data));
        navigate("/", true);
      } else {
        // toast.error(response.data.message);
      }
    })
    .catch(() => {
      console.log("e");
    });
};

const { apiFetching, userDataFailed, apiFailed } = slice.actions;
