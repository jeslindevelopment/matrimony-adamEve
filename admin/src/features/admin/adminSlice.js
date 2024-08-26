import { createSlice } from '@reduxjs/toolkit'
import { getSubscriptionDetail } from './adminActions';

const initialState = {
    subscriptionData: {}
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSubscriptionDetail.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getSubscriptionDetail.fulfilled, (state, action, payload) => {
            state.subscriptionData = action.payload.data
        })
        builder.addCase(getSubscriptionDetail.rejected, (state, action, payload) => {
            state.loading = false
            state.error = payload
        })
    }
});

export default adminSlice.reducer