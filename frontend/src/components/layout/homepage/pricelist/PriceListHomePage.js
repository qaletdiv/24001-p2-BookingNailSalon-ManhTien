import { tangerine } from "@/app/layout";
import styles from "./pricelist.module.css";
const PriceListHomePage = ({ data }) => {
  console.log(data);
  return (
    <section className="bg-black py-16 px-4 md:px-[10%]">
      {/* price list container */}
      <div className="bg-foreground rounded-md p-8">
        <div>
          <h1
            className={`${tangerine.className} text-6xl font-extrabold text-center `}
          >
            Price List
          </h1>
          <h2 className="text-center">For more Details</h2>
          <h2 className="text-center">Please call</h2>
          <h3 className="text-center font-bold">321-877-8445</h3>
        </div>
        <div
          className={`${styles.scroll} flex flex-col h-92 overflow-y-scroll gap-4 border-1 p-4 mt-4 border-black rounded-md`}
        >
          {data.map((service) => {
            return (
              <div key={service.id}>
                <div className="flex justify-between">
                  <h4 className="font-bold">{service.name}</h4>
                  <span>$ {service.price}</span>
                </div>
                <p>{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PriceListHomePage;
