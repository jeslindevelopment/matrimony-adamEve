import { createSlice } from "@reduxjs/toolkit";
import { Store } from 'react-notifications-component';
const initialState = {
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, action) => {
            Store.addNotification({
                message: action.payload.message,
                type: action.payload.type,
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
        },
    },
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;