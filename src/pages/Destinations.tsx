import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, ArrowRight, Sparkles, TrendingUp, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import barcelonaImg from "@/assets/destinations/barcelona.jpg";
import londonImg from "@/assets/destinations/london.jpg";
import tokyoImg from "@/assets/destinations/tokyo.jpg";
import dubaiImg from "@/assets/destinations/dubai.jpg";
import parisImg from "@/assets/destinations/paris.jpg";

const allDestinations = [
  { 
    id: 1, 
    name: "Barcelona", 
    country: "Spain", 
    image: barcelonaImg, 
    hotels: 2340, 
    avgPrice: 180,
    rating: 4.8,
    trending: true,
    description: "Gothic quarters, Gaudí masterpieces, and Mediterranean beaches"
  },
  { 
    id: 2, 
    name: "London", 
    country: "United Kingdom", 
    image: londonImg, 
    hotels: 4521,
    avgPrice: 220,
    rating: 4.7,
    trending: true,
    description: "Royal palaces, world-class museums, and iconic landmarks"
  },
  { 
    id: 3, 
    name: "Tokyo", 
    country: "Japan", 
    image: tokyoImg, 
    hotels: 3890,
    avgPrice: 195,
    rating: 4.9,
    trending: true,
    description: "Ancient temples, neon-lit streets, and culinary excellence"
  },
  { 
    id: 4, 
    name: "Dubai", 
    country: "UAE", 
    image: dubaiImg, 
    hotels: 1890,
    avgPrice: 280,
    rating: 4.8,
    trending: false,
    description: "Futuristic architecture, luxury shopping, and desert adventures"
  },
  { 
    id: 5, 
    name: "Paris", 
    country: "France", 
    image: parisImg, 
    hotels: 3210,
    avgPrice: 240,
    rating: 4.9,
    trending: true,
    description: "Romantic ambiance, art galleries, and exquisite cuisine"
  },
  { 
    id: 6, 
    name: "New York", 
    country: "USA", 
    image: barcelonaImg, 
    hotels: 5200,
    avgPrice: 300,
    rating: 4.7,
    trending: true,
    description: "The city that never sleeps with endless entertainment"
  },
  { 
    id: 7, 
    name: "Sydney", 
    country: "Australia", 
    image: londonImg, 
    hotels: 2100,
    avgPrice: 210,
    rating: 4.8,
    trending: false,
    description: "Stunning harbor views and beautiful beaches"
  },
  { 
    id: 8, 
    name: "Rome", 
    country: "Italy", 
    image: parisImg, 
    hotels: 2800,
    avgPrice: 175,
    rating: 4.8,
    trending: false,
    description: "Ancient ruins, Renaissance art, and authentic Italian cuisine"
  },
];

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredDestinations = allDestinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full animate-pulse" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in-down">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Discover Amazing Places</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Explore <span className="text-gradient">Destinations</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              From bustling cities to serene beaches, find your perfect getaway among our curated destinations
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-2xl glass border-border/50 focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold">{allDestinations.length}</span>
              <span className="text-muted-foreground">Destinations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="font-semibold">{allDestinations.filter(d => d.trending).length}</span>
              <span className="text-muted-foreground">Trending</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <Link
                key={destination.id}
                to={`/?destination=${destination.name.toLowerCase()}`}
                className="group relative rounded-3xl overflow-hidden cursor-pointer animate-fade-in-up transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(destination.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-500" />

                {/* Trending Badge */}
                {destination.trending && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold animate-pulse">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full glass">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground mb-3 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {destination.country}
                  </p>
                  
                  {/* Expandable Description */}
                  <div className={`overflow-hidden transition-all duration-500 ${hoveredCard === destination.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-muted-foreground mb-3">{destination.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary font-medium">
                        {destination.hotels.toLocaleString()} hotels
                      </span>
                      <span className="text-xs text-muted-foreground">
                        from ${destination.avgPrice}/night
                      </span>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-primary transition-all duration-300 ${hoveredCard === destination.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredDestinations.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-xl text-muted-foreground mb-4">No destinations found</p>
              <Button variant="ghost" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
