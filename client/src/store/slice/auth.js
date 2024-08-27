import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";
import secureLocalStorage from "react-secure-storage";
import { ADAM_EVE_API } from "../../services/apiConstant";
import { toast } from "react-hot-toast";

const slice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    userListData: null,
    message: "",
    isLoading: false,
    interestListData: [],
    shortListData:[]
  },
  reducers: {
    getUserDetailSuccess: (state, action) => {
      state.userData = action.payload;
    },
    getUsersListSuccess: (state, action) => {
      state.userListData = action.payload;
    },
    getProfileDetailSuccess: (state, action) => {
      state.profileDetail = action.payload;
    },
    getInterestListSuccess: (state, action) => {
      state.interestListData = action.payload;
    },
    shortListSuccess: (state, action) => {
      console.log("actio", action.payload);
      // state.interestListData = action.payload;
    },
    getShortListSuccess: (state, action) => {
      state.shortListData = action.payload;
    },
  },
});

export default slice.reducer;
const {
  getUserDetailSuccess,
  getUsersListSuccess,
  getProfileDetailSuccess,
  getInterestListSuccess,
  getShortListSuccess,
  shortListSuccess,
} = slice.actions;

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
      if (result.success) {
        dispatch(getUserDetailSuccess(result?.data[0]));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.c);
    });
};

// update User Deatils

export const updateUserDeatils = (requestParams) => async (dispatch) => {
  api
    .post(`${ADAM_EVE_API.auth.updateUserDeatils}`, requestParams)
    .then((response) => {
      let result = response.data;
      if (result.success) {
        console.log("ddd", result);
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.message);
    });
};

//  get Users List
export const getUsersList = (requestParams) => async (dispatch) => {
  api
    .get(`${ADAM_EVE_API.auth.getUsersList}`, requestParams)
    .then((response) => {
      let result = response.data;
      if (result.success) {
        dispatch(getUsersListSuccess(result));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.c);
    });
};
// get Profile Detail

export const getProfileDetail = (id) => async (dispatch) => {
  api
    .get(`${ADAM_EVE_API.auth.getProfileDetail}/${id}`)
    .then((response) => {
      let result = response.data;
      if (result.success) {
        console.log("dd", result);
        dispatch(getProfileDetailSuccess(result?.data[0]));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.c);
    });
};

//  shortList
export const shortList = (id, type) => async (dispatch) => {
  api
    .get(`${ADAM_EVE_API.auth.shortList}/${id}`)
    .then((response) => {
      let result = response.data;
      if (result.success) {
        console.log("dd", result);
        toast.success(response.data.message);

        dispatch(shortListSuccess({ id: id, type: type }));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.message);
    });
};

//  send Interest
export const sendInterest = (id, handleCloseDialog) => async (dispatch) => {
  api
    .post(`${ADAM_EVE_API.auth.sendInterest}/${id}`)
    .then((response) => {
      let result = response.data;
      if (result.success) {
        toast.success(result?.message);
      } else {
        toast.error(response.data.message);
      }
      handleCloseDialog();
    })
    .catch((e) => {
      console.log("e", e);
      handleCloseDialog();
      toast.error(e?.response?.data?.message);
    });
};

// get Interest List
export const getInterestList = () => async (dispatch) => {
  api
    .get(`${ADAM_EVE_API.auth.getInterestList}`)
    .then((response) => {
      let result = response.data;
      if (result.success) {
        dispatch(getInterestListSuccess(result.data));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.message);
    });
};
// contact Us

export const contactUs = (data) => async () => {
  api
    .post(`${ADAM_EVE_API.auth.contactUs}`, data)
    .then((response) => {
      let result = response.data;
      console.log("result", result);
      if (result.success) {
        console.log("ddd", result);
      } else {
        toast.error(response.data.data);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.data);
    });
};

//  get shortlist
export const getShortList = () => async (dispatch) => {
  api
    .get(`${ADAM_EVE_API.auth.getShortList}`)
    .then((response) => {
      let result = response.data;
      if (result.success) {
        dispatch(getShortListSuccess(result.message));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
      toast.error(e?.response?.data?.message);
    });
};
