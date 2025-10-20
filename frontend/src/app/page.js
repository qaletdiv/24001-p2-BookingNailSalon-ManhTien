import Hero from "@/components/layout/Hero/Hero";
import Counter from "../components/Counter";
import StoreProvider from "./StoreProvider";

export default function Home() {
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
