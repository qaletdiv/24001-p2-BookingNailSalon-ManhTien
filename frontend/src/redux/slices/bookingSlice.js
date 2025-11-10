import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bookings: [], // All completed bookings
  currentBooking: {
    // Current booking in progress
    step: "services", // 'services' | 'staff' | 'datetime' | 'customer' | 'review' | 'confirmed'
    currentSelected: [], // Format: { serviceId, serviceName, duration, price }
    services: {}, // Format: { serviceId, serviceName, duration, price }
    staff: {}, // Format: { staffId, staffName }
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
      state.currentBooking.services = action.payload;
    },

    clearServices: (state) => {
      state.currentBooking.services = {};
    },
    addStaff: (state, action) => {
      state.currentBooking.staff = action.payload;
    },

    clearStaff: (state) => {
      state.currentBooking.staff = {};
    },
    setCurrentSelected: (state, action) => {
      state.currentBooking.currentSelected.push(action.payload);
    },
    removeCurrentSelected: (state, action) => {
      state.currentBooking.currentSelected =
        state.currentBooking.currentSelected.filter(
          (selected) => selected.id !== action.payload
        );
    },
    clearCurrentSelected: (state) => {
      state.currentBooking.currentSelected = [];
    },
    setStep: (state, action) => {
      state.currentBooking.step = action.payload;
    },
    setTime: (state, action) => {
      state.currentBooking.selectedTimeSlot = action.payload;
    },
  },
  setSelectedDate: (state, action) => {
    state.currentBooking.selectedDate = action.payload;
  },
  setSelectedTimeSlot: (state, action) => {
    state.currentBooking.selectedTimeSlot = action.payload;
  },
  setAvailableTimeSlots: (state, action) => {
    state.currentBooking.availableTimeSlots = action.payload;
  },
  setCustomer: (state, action) => {
    state.currentBooking.customer = action.payload;
  },
});

export const {
  addService,
  removeService,
  clearServices,
  addStaff,
  removeStaff,
  clearStaff,
  setCurrentSelected,
  removeCurrentSelected,
  clearCurrentSelected,
  setStep,
  setTime,
} = bookingSlice.actions;
export default bookingSlice.reducer;
