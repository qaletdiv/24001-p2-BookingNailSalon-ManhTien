import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bookings: [], // All completed bookings
  currentBooking: {
    // Current booking in progress
    step: "services", // 'services' | 'staff' | 'datetime' | 'customer' | 'review' | 'confirmed'
    services: [], // Format: { serviceId, serviceName, duration, price }
    staff: [], // Format: { staffId, staffName }
    selectedDate: null,
    selectedTimeSlot: null,
    availableTimeSlots: [],
    customer: {
      name: "",
      phone: "",
      email: "",
    },
    totalDuration: 0,
    totalPrice: 0,
    notes: "",
    isValid: false, // Whether current step is valid
  },
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Add your reducers here
    addService: (state, action) => {
      state.currentBooking.services.push(action.payload);
    },
    removeService: (state, action) => {
      state.currentBooking.services = state.currentBooking.services.filter(
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
