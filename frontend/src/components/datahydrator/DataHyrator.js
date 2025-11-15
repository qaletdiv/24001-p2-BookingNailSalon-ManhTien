"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setServices } from "@/redux/slices/servicesSlice";
import { setStaff } from "@/redux/slices/staffSlice";
import { setAppointments } from "@/redux/slices/appointmentSlice";
export default function DataHydrator({ services, staff , appointments}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Hydrate Redux store with server-fetched data
    if (services) {
      dispatch(setServices(services));
    }
    if (staff) {
      dispatch(setStaff(staff));
    }
    if (appointments) {
      dispatch(setAppointments(appointments));
    }
  }, [dispatch, services, staff, appointments]);

  return null; // This component doesn't render anything
}
