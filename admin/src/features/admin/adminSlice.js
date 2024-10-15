import { createSlice } from '@reduxjs/toolkit'
import { getSubscriptionDetail, getSubscriptionPlan, getContactList, getDashboardData } from './adminActions';

const initialState = {
    subscriptionData: {},
    subscriptions: [],
    contacts: [],
    contactCount: 0,
    dashboardData: {},
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
        builder.addCase(getSubscriptionPlan.fulfilled, (state, action, payload) => {
            state.subscriptions = action.payload.data
        })
        builder.addCase(getContactList.fulfilled, (state, action, payload) => {
            state.contacts = action.payload.data
            state.contactCount = action.payload.count
        })
        builder.addCase(getDashboardData.fulfilled, (state, action, payload) => {
            state.dashboardData = action.payload
        })
    }
});

export default adminSlice.reducer