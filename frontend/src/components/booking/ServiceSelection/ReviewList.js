"use client";
import { useSelector } from "react-redux";
import { clearStaff, removeCurrentSelected } from "@/redux/slices/bookingSlice";
import { clearServices } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const ReviewList = () => {
  const [moreServices, setMoreServices] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentSelected } = useSelector(
    (state) => state.booking.currentBooking
  );
  useEffect(() => {
    dispatch(clearServices());
    dispatch(clearStaff());
    if (currentSelected.length === 0) {
      router.push("/booking/services");
    }
  }, [dispatch, currentSelected, router]);
  const handleRemoveService = (id) => {
    dispatch(removeCurrentSelected(id));
  };
  const handleAddMoreServices = () => {
    setMoreServices(true);
  };
  return (
    <>
      <div className="my-4 lg:w-1/2 md:w-[500px] mx-auto text-center">
        <p className="text-center text-lg font-bold ">
          Review your selections below.
        </p>
        <p className=" text-sm text-gray-700">
          Your can add more services by clicking the Add Service button.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {currentSelected.map((selected) => (
          <div
            key={selected.id}
            className="lg:w-3/4 md:w-[500px] w-full mx-auto shadow-md flex  justify-between items-center bg-white border border-gray-300 text-neutral-900 p-4 rounded-lg"
          >
            <div className="flex flex-col justify-between items-start">
              <span className="font-bold text-2xl ">
                {selected.ServiceName}
              </span>
              <span className="text-lg text-gray-700">
                Technician: {selected.StaffName}
              </span>
              {/* <span className="text-lg text-gray-700">
                Duration: {selected.duration} minutes
              </span>
              <span className="text-lg text-gray-700">
                Price: ${selected.price}
              </span> */}
            </div>
            <div className="flex flex-col gap-2">
              {/* <button className="bg-foreground text-neutral-900 px-4 py-2 rounded-full text-sm md:text-base">
                Change Service
              </button>
              <button className="bg-foreground text-neutral-900 px-4 py-2 rounded-full text-sm md:text-base">
                Change Technician
              </button> */}
              <button
                onClick={() => handleRemoveService(selected.id)}
                className="bg-foreground text-neutral-900 px-4 py-2 rounded-full text-sm md:text-base"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center gap-4 mt-4 lg:w-3/4  md:w-[80%] w-full mx-auto">
          <button
            onClick={handleAddMoreServices}
            className="bg-foreground text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full "
          >
            Add more services
          </button>
          <button className="bg-foreground text-base md:text-xl w-1/2 md:w-3/4 font-bold text-neutral-900 px-4 py-2 rounded-full ">
            Next
          </button>
        </div>
      </div>
      {moreServices && (
        <div
          id="more-services"
          className="flex justify-center items-center gap-4 mt-4 lg:w-3/4  md:w-[80%] w-full mx-auto"
        ></div>
      )}
    </>
  );
};

export default ReviewList;
