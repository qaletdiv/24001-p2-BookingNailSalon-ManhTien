export async function fetchStaffData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/staff`)
    if (!res.ok) {
      throw new Error("Failed to fetch staff data")
    }
    const staff = await res.json()
    return staff
  }