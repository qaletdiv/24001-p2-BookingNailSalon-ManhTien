const StaffList = ({ staffData }) => {
  return (
    <>
      <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2  gap-4 mt-8">
        <div className="shadow-md flex justify-between items-center bg-foreground text-neutral-900 p-4 rounded-lg">
          <span>Any available staff</span>
          <button className="bg-neutral-900 text-foreground px-4 py-2 rounded-full">
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
              <button className="bg-neutral-900 text-foreground px-4 py-2 rounded-full">
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
