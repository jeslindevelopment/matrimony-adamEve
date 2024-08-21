// authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { loginUser, logout, setSignupState, setSpinnerLoader } from './authActions'

const initialState = {
    loading: false,
    spinnerStart: false,
    userInfo: null,
    userToken: localStorage.getItem('userToken'),
    role: localStorage.getItem('role'),
    email: localStorage.getItem('email'),
    id: localStorage.getItem('id'),
    error: null,
    success: false,
    signuprole: localStorage.getItem('signuprole')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setSpinnerLoader.fulfilled, (state, action) => {
            state.spinnerStart = action.payload
        })
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, action, payload) => {
            state.role = action.payload.role
            state.userToken = action.payload.access_token
            state.email = action.payload.email
            state.id = action.payload.id
            localStorage.setItem('userToken', action.payload.access_token);
            localStorage.setItem('role', action.payload.role || "teacher");
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('id', action.payload.id);
            state.success = true
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        })
        builder.addCase(loginUser.rejected, (state, action, payload) => {
            state.loading = false
            state.error = payload
        })
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
        builder.addCase(logout.fulfilled, (state, action, payload) => {
            state.role = null
            state.userToken = null
            state.email = null
            localStorage.removeItem('role')
            localStorage.removeItem('userToken')
            localStorage.removeItem('email')
            state.success = true
        })
        builder.addCase(logout.rejected, (state, action, payload) => {
            state.loading = true
            state.error = payload
        })
        builder.addCase(setSignupState.fulfilled, (state, action, payload) => {
            state.signuprole = action.payload
            localStorage.setItem('signuprole', action.payload)
        })
    }
})
export default authSlice.reducer