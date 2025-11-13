import { configureStore } from "@reduxjs/toolkit";
import servicesSliceReducer from "@/redux/slices/servicesSlice";
import staffSliceReducer from "@/redux/slices/staffSlice";
import bookingSliceReducer from "@/redux/slices/bookingSlice";

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("bookingStateData");
    if (serializedState === null) {
      return undefined;
    }
    const bookingStateData = JSON.parse(serializedState);
    return {
      booking: {
        currentBooking: bookingStateData,
      },
    };
  }
  catch (error) {
    return undefined;
  }
};
const saveState = (state) => {
  const bookingStateData = state.booking.currentBooking;
  const serializedState = JSON.stringify( bookingStateData );
  sessionStorage.setItem("bookingStateData", serializedState);
  
};
const store = () => {
  // Load the state from the session storage
  const preloadedState = loadState();
  
  const storeInstance = configureStore({
    reducer: {
      services: servicesSliceReducer,
      staff: staffSliceReducer,
      booking: bookingSliceReducer,
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
