import Link from "next/link";

const ServicesHomePage = () => {
  return (
    <section>
      <div className="text-center py-8">
        <h1 className="font-tangerine text-7xl font-extrabold">Our Services</h1>
        <p className="text-sm">
          Your nails are a blank canvas waiting for creattivity.
        </p>
        <Link href={"/services"} className="my-6">
          READ MORE
        </Link>
      </div>
      <div>
        <div className="h-72">
          <div>image</div>
          <div>
            <Link href={"/services/#pedicure"}>Pedicure</Link>
          </div>
        </div>
        <div>
          <div>image</div>
          <div>
            <Link href={"/services/#medicure"}>Medicure</Link>
          </div>
        </div>
        <div>
          <div>image</div>
          <div>
            <Link href={"/services/#enhancement"}>Enhancement</Link>
          </div>
        </div>
        <div>
          <div>image</div>
          <div>
            <Link href={"/services/#addon"}>Add On</Link>
          </div>
        </div>
        <div>
          <div>image</div>
          <div>
            <Link href={"services/#waxing"}>Waxing</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHomePage;
