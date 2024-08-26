import { createSlice } from '@reduxjs/toolkit'
import { getUsers, getOtherUserDetail } from './userActions'

const initialState = {
    loading: false,
    spinnerStart: false,
    userList: [],
    userData: {},
    error: null,
    count: 0
}

const userSlice = createSlice({
    name: 'user',
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
        builder.addCase(getOtherUserDetail.fulfilled, (state, action, payload) => {
            console.log(action.payload, "action.payload")
            state.userData = action.payload.data
        })
    }
});

export default userSlice.reducer