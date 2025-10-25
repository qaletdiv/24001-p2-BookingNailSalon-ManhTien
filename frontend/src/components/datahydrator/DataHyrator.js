"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setServices } from "@/redux/slices/servicesSlice";
import { setStaff } from "@/redux/slices/staffSlice";

export default function DataHydrator({ services, staff }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Hydrate Redux store with server-fetched data
    if (services) {
      dispatch(setServices(services));
    }
    if (staff) {
      dispatch(setStaff(staff));
    }
  }, [dispatch, services, staff]);

  return null; // This component doesn't render anything
}
