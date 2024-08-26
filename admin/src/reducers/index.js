import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import notificationReducer from "../features/notification/notificationSlice"
import adminReducer from "../features/admin/adminSlice"

export const reducers = {
    auth: authReducer,
    admin: adminReducer,
    users: userReducer,
    notification: notificationReducer
}