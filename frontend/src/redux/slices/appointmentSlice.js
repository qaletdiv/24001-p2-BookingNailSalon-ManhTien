import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appointments: [],
    loading: false,
    error: null,
    initialized: false, //to check if the appointments have been loaded from the server
}
const appointmentSlice = createSlice({
    name: "appointments",
    initialState: initialState,
    reducers: {
        setAppointments: (state, action) => { 
            state.appointments = action.payload;
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
        clearAppointments: (state) => {
            state.appointments = [];
            state.loading = false;
            state.initialized = false;
            state.error = null;
        },
    },
});
export const { setAppointments, setLoading, setError, clearAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;