import Hero from "@/components/layout/Hero/Hero";

import StoreProvider from "./StoreProvider";
async function fetchServicesData() {
  const res = await fetch(`${process.env.API_SERVER}/services`);
  if (!res.ok)
    throw new Error(`Can't fetch data from the server! Something went wrong.`);
  const services = await res.json();
  return services;
}

export default async function Home() {
  const services = await fetchServicesData();
  console.log(services);
  return (
    <>
      <StoreProvider>
        <main>
          {/* Hero*/}
          <Hero />
        </main>
      </StoreProvider>
    </>
  );
}
