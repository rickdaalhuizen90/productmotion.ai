import backgroundImage from "../assets/media/bg.webp";

export function Hero({ className }: { className?: string }) {
  return (
    <section className={`flex items-center h-60 sm:h-70 md:h-80 lg:h-90 xl:h-100 mt-40 ${className}`}>
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="relative mx-auto text-center z-10 max-w-7xl">
          <h1 className="font-bold text-balance tracking-tight text-[clamp(2rem,5vw,4.5rem)] leading-[1.2] mb-6 sm:mb-8">
            Transforms basic product images into professional videos
          </h1>
          <h2 className="font-medium text-balance tracking-normal text-[clamp(1.125rem,3vw,2rem)] leading-[1.3] opacity-90">
            Automatically convert your product images into professional videos directly within your Shopify ecosystem
          </h2>
        </div>
      </div>
    </section>
  );
};
