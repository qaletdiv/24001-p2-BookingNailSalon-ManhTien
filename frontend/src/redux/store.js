import { configureStore } from "@reduxjs/toolkit";
import servicesSliceReducer from "@/redux/slices/servicesSlice";
import staffSliceReducer from "@/redux/slices/staffSlice";
const store = () => {
  return configureStore({ reducer: { services: servicesSliceReducer, staff: staffSliceReducer } });
};
export default store;
