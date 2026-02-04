import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
      <div className="glass rounded-2xl p-3 sm:p-4 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-shadow duration-500 group/bar">
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover/bar:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Location */}
          <div className="lg:col-span-2 relative group">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block pl-1 group-focus-within:text-primary transition-colors">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
              <Input
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 bg-secondary/30 border-border/50 hover:border-primary/40 focus:border-primary transition-all duration-300 hover:bg-secondary/40"
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="relative group">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block pl-1 group-focus-within:text-primary transition-colors">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
              <Input
                type="date"
                placeholder="Add date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="pl-12 bg-secondary/30 border-border/50 hover:border-primary/40 focus:border-primary transition-all duration-300 hover:bg-secondary/40"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="relative group">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block pl-1 group-focus-within:text-primary transition-colors">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
              <Input
                type="date"
                placeholder="Add date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="pl-12 bg-secondary/30 border-border/50 hover:border-primary/40 focus:border-primary transition-all duration-300 hover:bg-secondary/40"
              />
            </div>
          </div>

          {/* Guests + Search Button */}
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative group">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block pl-1 group-focus-within:text-primary transition-colors">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
                <Input
                  type="number"
                  placeholder="2"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="pl-12 bg-secondary/30 border-border/50 hover:border-primary/40 focus:border-primary transition-all duration-300 hover:bg-secondary/40"
                />
              </div>
            </div>
            <Button variant="hero" size="lg" className="h-12 px-6 group/btn relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <Search className="h-5 w-5 transition-transform group-hover/btn:scale-110 group-hover/btn:rotate-12" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
