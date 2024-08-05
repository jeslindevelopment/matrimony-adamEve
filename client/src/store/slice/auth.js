import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";
import secureLocalStorage from "react-secure-storage";
import { ADAM_EVE_API } from "../../services/apiConstant";
import { toast } from "react-hot-toast";

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
// user login
export const userlogin =
  (requestParams, setIsLoading, navigate) => async (dispatch) => {
    api
      .post(`${ADAM_EVE_API.auth.login}`, requestParams)
      .then((response) => {
        let result = response.data;
        if (result.success) {
          toast.success(result?.c);
          secureLocalStorage.setItem(
            process.env.REACT_APP_TOKEN_STORAGE_KEY,
            result
          );
          navigate("/");
          window.location.reload();
        } else {
          toast.error(response.data.message);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("e", e);
        toast.error(e?.response?.data?.message);
        setIsLoading(false);
      });
  };

// user register
export const signUp =
  (requestParams, setIsLoading, navigate) => async (dispatch) => {
    api
      .post(`${ADAM_EVE_API.auth.signUp}`, requestParams)
      .then((response) => {
        let result = response.data;
        if (result.success) {
          toast.success(result?.c);
          secureLocalStorage.setItem(
            process.env.REACT_APP_TOKEN_STORAGE_KEY,
            result
          );
          navigate("/");
          window.location.reload();
        } else {
          toast.error(response.data.message);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("e", e);
        toast.error(e?.response?.data?.errors[0]?.msg);
        setIsLoading(false);
      });
  };
// get user detail

export const getUserDetail = (requestParams) => async (dispatch) => {
  api
    .get(`${ADAM_EVE_API.auth.getUserDetail}`, requestParams)
    .then((response) => {
      let result = response.data;
      console.log("result", result);
      if (result.success) {
        toast.success(result?.c);
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.c
      );
    });
};
const { apiFetching, userDataFailed, apiFailed } = slice.actions;
