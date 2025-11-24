export async function fetchServicesData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/services`);
  if (!res.ok)
    throw new Error(`Can't fetch data from the server! Something went wrong.`);
  const services = await res.json();
  return services;
}