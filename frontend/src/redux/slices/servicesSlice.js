import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    services: [],
    loading: false,
    error: null,
    initialized: false, //to check if the services have been loaded from the server
}
const servicesSlice = createSlice({
    name: "services",
    initialState: initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
            state.loading = false;
            state.initialized = true;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearServices: (state) => {
            state.services = [];
            state.loading = false;
            state.initialized = false;
            state.error = null;
        },
    },
});
export const { setServices, setLoading, setError, clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;