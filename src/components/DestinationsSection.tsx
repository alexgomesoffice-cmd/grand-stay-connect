import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import barcelonaImg from "@/assets/destinations/barcelona.jpg";
import londonImg from "@/assets/destinations/london.jpg";
import tokyoImg from "@/assets/destinations/tokyo.jpg";
import dubaiImg from "@/assets/destinations/dubai.jpg";
import parisImg from "@/assets/destinations/paris.jpg";

const destinations = [
  { name: "Barcelona", country: "Spain", image: barcelonaImg, hotels: 2340 },
  { name: "London", country: "United Kingdom", image: londonImg, hotels: 4521 },
  { name: "Tokyo", country: "Japan", image: tokyoImg, hotels: 3890 },
  { name: "Dubai", country: "UAE", image: dubaiImg, hotels: 1890 },
  { name: "Paris", country: "France", image: parisImg, hotels: 3210 },
];

const DestinationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-3 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              Popular <span className="text-gradient">Destinations</span>
            </h2>
            <p
              className={`text-muted-foreground max-w-lg ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              Explore trending destinations loved by travelers worldwide
            </p>
          </div>
          <button
            className={`group flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            View all destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {destinations.map((destination, index) => (
            <div
              key={destination.name}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {destination.country}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    {destination.hotels.toLocaleString()} hotels
                  </span>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 border border-primary/30 rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
