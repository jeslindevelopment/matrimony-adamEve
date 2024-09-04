import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";
import secureLocalStorage from "react-secure-storage";
import { ADAM_EVE_API } from "../../services/apiConstant";
import { toast } from "react-hot-toast";

const slice = createSlice({
  name: "subscription",
  initialState: {
    planListData: [],
  },
  reducers: {
    getPlansListSuccess: (state, action) => {
      state.planListData = action.payload;
    },
  },
});

export default slice.reducer;
const { getPlansListSuccess } = slice.actions;

/**********************ACTIONS************************************************ */
//  get PlansList
export const getPlansList = () => async (dispatch) => {
    api
      .get(`${ADAM_EVE_API.auth.getPlansList}`)
      .then((response) => {
        let result = response.data;
        if (result.success) {

          dispatch(getPlansListSuccess(result.data));
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((e) => {
        console.log("e", e);
      });
  };
  