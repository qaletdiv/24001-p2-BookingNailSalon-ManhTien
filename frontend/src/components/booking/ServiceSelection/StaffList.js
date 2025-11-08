"use client";
import { addStaff } from "@/redux/slices/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setStep, setCurrentSelected } from "@/redux/slices/bookingSlice";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const StaffList = ({ staffData }) => {
  const dispatch = useAppDispatch();
  const { services } = useSelector((state) => state.booking.currentBooking);
  const router = useRouter();
  const handleAddStaff = (id, name) => {
    dispatch(addStaff({ id, name }));
    dispatch(
      setCurrentSelected({
        id: uuidv4(),
        ServiceId: services.id,
        ServiceName: services.name,
        StaffId: id,
        StaffName: name,
        duration: services.duration,
        price: services.price,
      })
    );
    dispatch(setStep("options"));
    router.push("/booking/review");
  };
  const handleBookAnyStaff = () => {
    dispatch(addStaff({ id: "any", name: "Any available staff" }));
    dispatch(
      setCurrentSelected({
        id: uuidv4(),
        ServiceId: services.id,
        ServiceName: services.name,
        StaffId: "any",
        StaffName: "Any available staff",
        duration: services.duration,
        price: services.price,
      })
    );
    dispatch(setStep("options"));
    router.push("/booking/review");
  };
  return (
    <>
      <div className="overflow-hidden grid lg:w-3/4 md:w-[500px] w-full mx-auto grid-cols-1 md:grid-cols-2  gap-4 mt-8">
        <div className="shadow-md flex justify-between items-center bg-foreground text-neutral-900 p-4 rounded-lg">
          <span>Any available staff</span>
          <button
            onClick={handleBookAnyStaff}
            className="bg-neutral-900 text-foreground px-4 py-2 rounded-full"
          >
            Book
          </button>
        </div>
        {staffData.map((staff) => {
          return (
            <div
              key={staff.id}
              className="flex shadow-md justify-between items-center bg-foreground text-neutral-900 p-4 rounded-lg"
            >
              <span>{staff.name}</span>
              <button
                onClick={() => handleAddStaff(staff.id, staff.name)}
                className="bg-neutral-900 text-foreground px-4 py-2 rounded-full"
              >
                Book
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StaffList;
