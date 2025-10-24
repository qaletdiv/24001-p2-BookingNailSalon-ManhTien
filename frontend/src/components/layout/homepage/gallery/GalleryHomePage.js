import { tangerine } from "@/app/layout";
const GalleryHomePage = () => {
  return (
    <section className="py-12 flex flex-col gap-4 px-4">
      <div className="text-center">
        <h1 className={`${tangerine.className} text-7xl`}>Gallery</h1>
        <h2 className="text-foreground text-xl">Our Portfolio</h2>
      </div>
      <div>
        <div className="text-black h-92 bg-foreground">image</div>
      </div>
    </section>
  );
};

export default GalleryHomePage;
