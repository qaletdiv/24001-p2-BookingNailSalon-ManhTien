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
  },
});

export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
