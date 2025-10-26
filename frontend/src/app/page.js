import Hero from "@/components/layout/Hero/Hero";

import ServicesHomePage from "@/components/layout/homepage/services/ServicesHomePage";
import AboutHomePage from "@/components/layout/homepage/about/AboutHomePage";
import PriceListHomePage from "@/components/layout/homepage/pricelist/PriceListHomePage";
import GalleryHomePage from "@/components/layout/homepage/gallery/GalleryHomePage";
import { fetchServicesData } from "@/functions/fetchServicesData";
import { fetchStaffData } from "@/functions/fetchStaffData";
import DataHydrator from "@/components/datahydrator/DataHyrator";
export default async function Home() {
  const services = await fetchServicesData();
  const staff = await fetchStaffData();
  return (
    <>
        <DataHydrator services={services} staff={staff} />
        {/* Hero*/}
        <Hero />
        <AboutHomePage />
        <ServicesHomePage />
        {/* <PriceListHomePage  /> */}
        <GalleryHomePage />
      
    </>
  );
}
