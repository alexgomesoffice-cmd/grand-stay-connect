import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchHotels, type HotelResponse } from "@/services/adminApi";
import { useToast } from "@/hooks/use-toast";

const AdminUpdateHotel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotel, setHotel] = useState<HotelResponse | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadHotel = async () => {
      try {
        const hotels = await fetchHotels();
        const foundHotel = hotels.find((h: HotelResponse) => h.hotel_id === Number(id));
        setHotel(foundHotel || null);
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load hotel",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    loadHotel();
  }, [id, toast]);

  const handleSubmit = () => {
    toast({
      title: "Feature Not Implemented",
      description: "Hotel updates require backend API endpoint (PUT /api/hotels/:id).",
      variant: "destructive",
    });
  };

  if (!hotel) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Button variant="outline" onClick={() => navigate("/admin/hotels")}>Go Back</Button>
        <Card>
          <CardContent className="p-6">
            <p className="font-medium">Hotel not found.</p>
            <p className="text-sm text-muted-foreground">This hotel may have been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`flex items-center gap-4 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <Button variant="outline" size="icon" onClick={() => navigate("/admin/hotels")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Update Hotel Info</h1>
          <p className="text-muted-foreground">Edit property details for {hotel.name}</p>
        </div>
      </div>

      <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
        <CardHeader>
          <CardTitle>Hotel Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Name</p>
              <p className="text-sm font-medium">{hotel.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">City</p>
              <p className="text-sm font-medium">{hotel.city || "N/A"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Type</p>
              <p className="text-sm font-medium capitalize">{hotel.hotel_type || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Rating</p>
              <p className="text-sm font-medium">{hotel.star_rating ? `${hotel.star_rating} Stars` : "N/A"}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Address</p>
            <p className="text-sm font-medium">{hotel.address || "N/A"}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
              <p className="text-sm font-medium">{hotel.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Owner</p>
              <p className="text-sm font-medium">{hotel.owner_name || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "180ms" }}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Feature Requires Backend API</h3>
              <p className="text-sm text-amber-800 mb-4">
                Hotel updates require the following backend endpoint:
              </p>
              <code className="block bg-amber-100 rounded p-2 text-xs font-mono text-amber-900">
                PUT /api/hotels/:id
              </code>
              <p className="text-sm text-amber-800 mt-4">
                Please set up the hotel update endpoint in your backend before using this feature.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/admin/hotels")}>Cancel</Button>
        <Button type="button" variant="hero" disabled onClick={handleSubmit}>Save Changes (Disabled)</Button>
      </div>
    </div>
  );
};

export default AdminUpdateHotel;
