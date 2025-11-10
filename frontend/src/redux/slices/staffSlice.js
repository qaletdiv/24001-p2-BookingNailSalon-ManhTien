import  {createSlice} from "@reduxjs/toolkit";
const initialState = {
    staff: [],
    loading: false,
    error: null,
    initialized: false, //to check if the staff have been loaded from the server
}
const staffSlice = createSlice({
    name: "staff",
    initialState: initialState,
    reducers: {
        setStaff: (state, action) => {
            state.staff = action.payload;
            state.loading = false;
            state.initialized = true;
            state.error = null;
        },
        setLoading: (state,action) => {
            state.loading = action.payload;
        },
        setError: (state,action) => {
            state.error = action.payload;
        },
        clearStaff: (state) => {
            state.staff = [];
            state.loading = false;
            state.initialized = false;
            state.error = null;
        },
    },
});
export const { setStaff, setLoading, setError, clearStaff } = staffSlice.actions;
export default staffSlice.reducer;