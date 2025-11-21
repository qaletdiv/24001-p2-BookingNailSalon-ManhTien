export default function CustomerInfor() {
  return (
    <>
    <div>
      <p>Your name and phone number will be used to send you appointment confirmations and reminders. We’ll also be able to call or text you if anything changes.</p>
    </div>
    <div className="flex flex-col gap-4">
        <input type="text" placeholder="Full Name (*)" className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md" />
        <input type="tel" placeholder="Phone Number (*)" className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md" />
        <input type="email" placeholder="Email (optional)" className="focus:outline-1 bg-gray-200 w-full md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md" />
        <p className="text-sm text-blue-500">(*) is required. Please check your input before submit.</p>
        <textarea placeholder="Notes (optional)" className="focus:outline-1 bg-gray-200 w-full h-36 md:w-3/4 mx-auto text-neutral-900 px-4 py-2  rounded-md" />
    </div>
    <div>
      <button>Book Appointment</button>
    </div>
    </>
  );
}