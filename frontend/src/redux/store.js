import { configureStore } from "@reduxjs/toolkit";
import servicesSliceReducer from "@/redux/slices/servicesSlice";
import staffSliceReducer from "@/redux/slices/staffSlice";
import bookingSliceReducer from "@/redux/slices/bookingSlice";
import appointmentsSliceReducer from "@/redux/slices/appointmentSlice";
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("stateDate");
    if (serializedState === null) {
      return undefined;
    }
    const stateDate = JSON.parse(serializedState);
    return stateDate;
  }
  catch (error) {
    return undefined;
  }
};
const saveState = (state) => {
  const stateDate = state
  const serializedState = JSON.stringify( stateDate );
  sessionStorage.setItem("stateDate", serializedState);
  
};
const store = () => {
  // Load the state from the session storage
  const preloadedState = loadState();
  
  const storeInstance = configureStore({
    reducer: {
      services: servicesSliceReducer,
      staff: staffSliceReducer,
      booking: bookingSliceReducer,
      appointments: appointmentsSliceReducer,
    },
    preloadedState,
  });

  // Save the state to the session storage
  storeInstance.subscribe(() => {
    saveState(storeInstance.getState());
  });
  return storeInstance;
};
export default store;
