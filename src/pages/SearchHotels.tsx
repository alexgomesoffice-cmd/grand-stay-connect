import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Star, Heart, MapPin, LayoutGrid, List, ArrowUpDown, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPublicHotels, PublicHotel } from "@/services/publicHotelApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import HotelFilterSidebar from "@/components/HotelFilterSidebar";

const SearchHotels = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [likedHotels, setLikedHotels] = useState<number[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hotels, setHotels] = useState<PublicHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locationQuery = searchParams.get("location") || "";

  useEffect(() => {
    setIsLoaded(true);
    setLoading(true);
    setError(null);
    fetchPublicHotels({ location: locationQuery })
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load hotels");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationQuery]);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedHotels((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero search section */}
      <section className="relative bg-secondary/20 pt-28 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/50" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-3xl sm:text-4xl font-bold text-center mb-2 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
            Search <span className="text-gradient">Hotels</span>
          </h1>
          <p className={`text-muted-foreground text-center mb-8 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "50ms" }}>
            Find your perfect stay
          </p>
          <SearchBar />
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`${isLoaded ? "animate-fade-in-left" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            <HotelFilterSidebar />
          </div>

          <div className="flex-1">
            {/* Toolbar */}
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
              <span className="text-sm text-muted-foreground">
                {loading ? "Loading hotels..." : `${hotels.length} hotel${hotels.length !== 1 ? "s" : ""} found`}
                {locationQuery && !loading && <> for "<span className="text-foreground font-medium">{locationQuery}</span>"</>}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="gap-2">
                  <MapPinned className="h-4 w-4" /> <span className="hidden sm:inline">See Location</span>
                </Button>
                <Button variant={view === "grid" ? "default" : "outline"} size="icon" className="h-9 w-9" onClick={() => setView("grid")}>
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant={view === "list" ? "default" : "outline"} size="icon" className="h-9 w-9" onClick={() => setView("list")}>
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" /> <span className="hidden sm:inline">Sort by</span>
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-center py-16">
                <p className="text-xl font-semibold mb-2 text-destructive">{error}</p>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
            {!error && (
              <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {hotels.map((hotel, index) => {
                  // Get cover image or fallback
                  const coverImg = hotel.hotel_images?.find(img => img.is_cover)?.image_url || hotel.hotel_images?.[0]?.image_url || "https://via.placeholder.com/400x300?text=No+Image";
                  return (
                    <div
                      key={hotel.hotel_id}
                      onClick={() => navigate(`/hotel/${hotel.hotel_id}`)}
                      className={`group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-2 ${isLoaded ? "animate-fade-in-up" : "opacity-0"} ${view === "list" ? "flex flex-col sm:flex-row" : ""}`}
                      style={{ animationDelay: `${(index + 3) * 80}ms` }}
                    >
                      <div className={`relative overflow-hidden ${view === "list" ? "w-full sm:w-72 shrink-0 aspect-[16/10] sm:aspect-auto sm:h-auto" : "aspect-[4/3]"}`}>
                        <img src={coverImg} alt={hotel.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                        <button onClick={(e) => toggleLike(e, hotel.hotel_id)} className="absolute top-4 right-4 p-2.5 rounded-full glass transition-all duration-300 hover:scale-125 z-10">
                          <Heart className={`h-5 w-5 transition-all ${likedHotels.includes(hotel.hotel_id) ? "fill-destructive text-destructive" : "text-foreground hover:text-destructive"}`} />
                        </button>
                        {hotel.hotel_details?.star_rating && (
                          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm z-10">
                            <Star className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
                            <span className="text-sm font-semibold text-primary-foreground">{hotel.hotel_details.star_rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mr-2">{hotel.name}</h3>
                          {hotel.hotel_rooms && hotel.hotel_rooms.length > 0 && (
                            <span className="text-base font-bold text-primary">$
                              {hotel.hotel_rooms
                                .map((room) => room.base_price)
                                .reduce((min, price) => price < min ? price : min, hotel.hotel_rooms[0].base_price)}
                              <span className="text-sm text-muted-foreground ml-1">/ night</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{hotel.city || hotel.address || "Unknown"}</span>
                        </div>
                        {hotel.hotel_details?.description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{hotel.hotel_details.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hotel.hotel_type && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{hotel.hotel_type}</span>
                          )}
                        </div>
                        {/* No rooms available message */}
                        {(!hotel.hotel_rooms || hotel.hotel_rooms.length === 0) && (
                          <div className="mb-2">
                            <span className="text-sm text-muted-foreground">No rooms available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No hotels found handled by error or empty hotels array above */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchHotels;
