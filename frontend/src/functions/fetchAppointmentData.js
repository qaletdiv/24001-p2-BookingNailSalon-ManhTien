export async function fetchAppointmentData() {
  const res = await fetch(`${process.env.API_SERVER}/appointments`);
  if (!res.ok) throw new Error("Failed to fetch appointment data");
  const appointments = await res.json();
  return appointments;
}
