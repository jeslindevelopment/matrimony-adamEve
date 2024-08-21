import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'

export const reducers = {
    auth: authReducer,
    users: userReducer
}