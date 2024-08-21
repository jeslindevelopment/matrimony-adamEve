import { logout } from "./auth/authActions";
import { showNotification } from "./notification/notificationSlice";

export const handleError = ({ error, rejectWithValue, dispatch, getState }) => {
    if (error && error.response && (error.response.status == 409 || error.response.status == 401)) {
        const { auth } = getState()
        dispatch(logout({ email: auth.email }));
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000)
    }
    // return custom error message from backend if present
    if (error && error.response && error.response.data.detail) {
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