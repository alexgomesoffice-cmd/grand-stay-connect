import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchAmenities, fetchHotelById, type AmenityOption, type HotelResponse } from "@/services/adminApi";
import { useToast } from "@/hooks/use-toast";
import { apiPut } from "@/utils/api";

const HotelAdminHotelEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hotel, setHotel] = useState<HotelResponse | null>(null);

  const [description, setDescription] = useState("");
  const [receptionNo1, setReceptionNo1] = useState("");
  const [receptionNo2, setReceptionNo2] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityOptions, setAmenityOptions] = useState<AmenityOption[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    const loadHotel = async () => {
      try {
        const hotelId = Number(localStorage.getItem("hotelId"));
        if (!hotelId) throw new Error("Assigned hotel not found. Please login again.");

        const [foundHotel, amenitiesList] = await Promise.all([
          fetchHotelById(hotelId),
          fetchAmenities(),
        ]);

        setHotel(foundHotel);
        setAmenityOptions(amenitiesList || []);

        setDescription(foundHotel.hotel_details?.description || "");
        setReceptionNo1(foundHotel.hotel_details?.reception_no1 || "");
        setReceptionNo2(foundHotel.hotel_details?.reception_no2 || "");

        setImages((foundHotel as any).hotel_images?.map((i: any) => i.image_url) || []);
        setAmenities((foundHotel as any).hotel_amenities?.map((h: any) => h.amenity?.name || "") || []);
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
  }, [toast]);

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    if (images.length >= 8) {
      toast({ title: "Image limit", description: "You can add up to 8 images", variant: "destructive" });
      return;
    }
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl("");
  };

  const handleAmenityToggle = (name: string) => {
    setAmenities((prev) => {
      if (prev.includes(name)) {
        return prev.filter((a) => a !== name);
      }
      return [...prev, name];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hotelId = Number(localStorage.getItem("hotelId"));
    if (!hotelId) {
      toast({ title: "Error", description: "Hotel ID missing", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiPut(`/hotels/${hotelId}`, {
        details: {
          description: description || undefined,
          reception_no1: receptionNo1 || undefined,
          reception_no2: receptionNo2 || undefined,
        },
        amenities,
        images,
      });

      if (response.success === false) throw new Error(response.message || "Failed to update hotel");

      toast({ title: "Hotel updated", description: "Updated successfully." });
      navigate("/hotel-admin");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update hotel",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Button variant="outline" onClick={() => navigate("/hotel-admin")}>Go Back</Button>
        <Card><CardContent className="p-6"><p className="font-medium">Loading hotel details...</p></CardContent></Card>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Button variant="outline" onClick={() => navigate("/hotel-admin")}>Go Back</Button>
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
        <Button variant="outline" size="icon" onClick={() => navigate("/hotel-admin")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Hotel Details</h1>
          <p className="text-muted-foreground">Only hotel images, amenities, real reception, and description can be changed.</p>
        </div>
      </div>

      <Card className={isLoaded ? "animate-fade-in-up" : "opacity-0"} style={{ animationDelay: "100ms" }}>
        <CardHeader><CardTitle>Current Images</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {images.length ? images.map((url, i) => (
              <div key={`${url}-${i}`} className="relative border rounded-lg overflow-hidden">
                <img src={url} alt={`hotel image ${i + 1}`} className="h-20 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-red-500/90"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )) : (
              <div className="col-span-full rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">No images yet</div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="Enter image URL" />
            <Button type="button" onClick={handleAddImage} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">You can store up to 8 images.</p>
        </CardContent>
      </Card>

      <Card className={isLoaded ? "animate-fade-in-up" : "opacity-0"} style={{ animationDelay: "120ms" }}>
        <CardHeader><CardTitle>Amenities</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {amenityOptions.length > 0 ? (
              amenityOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                    amenities.includes(option.name)
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:border-primary/30 hover:bg-secondary/50"
                  }`}
                >
                  <Checkbox
                    checked={amenities.includes(option.name)}
                    onCheckedChange={() => handleAmenityToggle(option.name)}
                  />
                  <span className="text-sm font-medium truncate">{option.name}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Loading amenities...</p>
            )}
          </div>
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {amenities.map((amenity) => (
                <span key={amenity} className="inline-flex items-center gap-1 rounded-full bg-secondary/40 px-2 py-1 text-xs">
                  {amenity}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">Selected amenities are saved to your hotel record.</p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className={isLoaded ? "animate-fade-in-up" : "opacity-0"} style={{ animationDelay: "140ms" }}>
          <CardHeader><CardTitle>Hotel Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-24" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Reception Number 1</Label>
                <Input value={receptionNo1} onChange={(e) => setReceptionNo1(e.target.value)} placeholder="+880-XXXX-XXXXXX" />
              </div>
              <div className="space-y-2">
                <Label>Reception Number 2</Label>
                <Input value={receptionNo2} onChange={(e) => setReceptionNo2(e.target.value)} placeholder="Optional" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/hotel-admin")}>Cancel</Button>
          <Button type="submit" variant="hero" disabled={isSubmitting}>{isSubmitting ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}</Button>
        </div>
      </form>
    </div>
  );
};

export default HotelAdminHotelEdit;