import { Tangerine } from "next/font/google";
const tangerine = Tangerine({
  weight: ["400", "700"],
  variable: "--font-tangerine",
  subsets: ["latin"],
});
const ServicesPage = () => {
  return (
    <main className="p-4 bg-background pt-24">
      <h1
        className={`${tangerine.className} text-center py-12 text-6xl font-bold text-neutral-900`}
      >
        <em>Services</em>
      </h1>
    </main>
  );
};

export default ServicesPage;
