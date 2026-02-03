import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import FeaturedHotels from "@/components/FeaturedHotels";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <DestinationsSection />
        <FeaturedHotels />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
