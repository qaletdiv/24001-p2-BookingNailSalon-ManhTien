import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  selectedDate: null,
  availableTimeSlots: [],
  selectedServices: [],
  customer: {
    name: "",
    phone: "",
    email: "",
  },
  staff: "",
  totalDuration: 0,
  totalPrice: 0,
  notes: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Add your reducers here
    addService: (state, action) => {
      state.selectedServices.push(action.payload);
    },
    removeService: (state, action) => {
      state.selectedServices = state.selectedServices.filter(
        (service) => service.id !== action.payload.id
      );
    },
    clearServices: (state) => {
      state.selectedServices = [];
    },
  },
});

export const { addService, removeService, clearServices } =
  bookingSlice.actions;
export default bookingSlice.reducer;
