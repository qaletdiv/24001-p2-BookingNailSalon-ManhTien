import Hero from "@/components/layout/Hero/Hero";

import StoreProvider from "./StoreProvider";
import ServicesHomePage from "@/components/layout/homepage/services/ServicesHomePage";
import AboutHomePage from "@/components/layout/homepage/about/AboutHomePage";
import PriceListHomePage from "@/components/layout/homepage/pricelist/PriceListHomePage";
import GalleryHomePage from "@/components/layout/homepage/gallery/GalleryHomePage";
import Image from "next/image";
async function fetchServicesData() {
  const res = await fetch(`${process.env.API_SERVER}/services`);
  if (!res.ok)
    throw new Error(`Can't fetch data from the server! Something went wrong.`);
  const services = await res.json();
  return services;
}

export default async function Home() {
  const services = await fetchServicesData();

  return (
    <>
      <StoreProvider>
        {/* Hero*/}

        <Hero />
        <AboutHomePage />
        <ServicesHomePage />
        <PriceListHomePage data={services} />
        <GalleryHomePage />
      </StoreProvider>
    </>
  );
}
