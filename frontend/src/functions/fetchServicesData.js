export async function fetchServicesData() {
  const res = await fetch(`${process.env.API_SERVER}/services`);
  if (!res.ok)
    throw new Error(`Can't fetch data from the server! Something went wrong.`);
  const services = await res.json();
  return services;
}