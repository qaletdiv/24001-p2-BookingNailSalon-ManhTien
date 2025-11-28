import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const bookAppointment = createAsyncThunk(
  "booking/bookAppointment",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/appointments`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Appointment created successfully:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
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
    setSelectedDate: (state, action) => {
      state.currentBooking.selectedDate = action.payload;
    },
    resetBooking: (state) => {
      // Reset to initial state
      state.currentBooking = {
        ...initialState.currentBooking,
      };
      state.loading = false;
      state.error = null;
    },
    setCustomer: (state, action) => {
      state.currentBooking.customer = action.payload;
    },
    clearCustomer: (state) => {
      state.currentBooking.customer = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bookAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(bookAppointment.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(bookAppointment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
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
  setSelectedDate,
  resetBooking,
  setCustomer,
  clearCustomer,
} = bookingSlice.actions;
export default bookingSlice.reducer;
