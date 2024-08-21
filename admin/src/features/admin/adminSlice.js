import { createSlice } from '@reduxjs/toolkit'
import { getUsers, logout, setSignupState, setSpinnerLoader } from './userActions'

const initialState = {
    loading: false,
    spinnerStart: false,
    userList: [],
    error: null,
    count: 0
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getUsers.fulfilled, (state, action, payload) => {
            console.log(action.payload, "action.payload")
            state.userList = action.payload.data
            state.count = action.payload.count
        })
        builder.addCase(getUsers.rejected, (state, action, payload) => {
            state.loading = false
            state.error = payload
        })
    }
});

export default adminSlice.reducer