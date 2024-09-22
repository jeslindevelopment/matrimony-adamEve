import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";
import { ADAM_EVE_API } from "../../services/apiConstant";
import { toast } from "react-hot-toast";

const slice = createSlice({
  name: "message",
  initialState: {
    planListData: [],
  },
  reducers: {
    getMessageListSuccess: (state, action) => {
      state.messageList = action.payload;
    },
  },
});

export default slice.reducer;
const { getMessageListSuccess } = slice.actions;

/**********************ACTIONS************************************************ */
//  get messageList
export const getMessageList = () => async (dispatch) => {
  api
    .get(`${ADAM_EVE_API.message.getMessageList}`)
    .then((response) => {
      let result = response.data;
      console.log("result", result);
      if (result.success) {
        dispatch(getMessageListSuccess(result.data));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
    });
};

//  send message
export const sendMessage = (data) => async (dispatch) => {
  api
    .post(`${ADAM_EVE_API.message.sendMessage}`, data)
    .then((response) => {
      let result = response.data;
      console.log("result", result);
      if (result.success) {
        // dispatch(getMessageListSuccess(result.data));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((e) => {
      console.log("e", e);
    });
};
