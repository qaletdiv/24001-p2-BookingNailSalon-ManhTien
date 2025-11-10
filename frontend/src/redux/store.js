import { configureStore } from "@reduxjs/toolkit";
import servicesSliceReducer from "@/redux/slices/servicesSlice";
import staffSliceReducer from "@/redux/slices/staffSlice";
import bookingSliceReducer from "@/redux/slices/bookingSlice";
const store = () => {
  return configureStore({
    reducer: {
      services: servicesSliceReducer,
      staff: staffSliceReducer,
      booking: bookingSliceReducer,
    },
  });
};
export default store;
