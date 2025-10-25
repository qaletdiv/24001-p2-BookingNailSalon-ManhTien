import Hero from "@/components/layout/Hero/Hero";

import StoreProvider from "./StoreProvider";
import ServicesHomePage from "@/components/layout/homepage/services/ServicesHomePage";
import AboutHomePage from "@/components/layout/homepage/about/AboutHomePage";
import PriceListHomePage from "@/components/layout/homepage/pricelist/PriceListHomePage";
import GalleryHomePage from "@/components/layout/homepage/gallery/GalleryHomePage";
import Image from "next/image";
import { fetchServicesData } from "@/functions/fetchServicesData";

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
