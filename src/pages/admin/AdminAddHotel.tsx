import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const bangladeshCities = [
  "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet",
  "Rangpur", "Barisal", "Comilla", "Gazipur", "Narayanganj",
  "Mymensingh", "Jessore", "Bogra", "Dinajpur", "Cox's Bazar",
  "Brahmanbaria", "Savar", "Tongi", "Narsingdi", "Tangail",
];

const hotelAmenities = [
  "Swimming Pool", "Gym / Fitness Center", "Free Wi-Fi", "Parking",
  "Restaurant", "Bar / Lounge", "Spa & Wellness", "Conference Room",
  "24/7 Front Desk", "Room Service", "Laundry Service", "Airport Shuttle",
  "Garden / Terrace", "Elevator", "CCTV Security", "Power Backup",
  "Wheelchair Accessible", "Pet Friendly", "Kids Play Area", "Business Center",
];

const AdminAddHotel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "", city: "", address: "", zipCode: "", description: "", hotel_type: "", star_rating: "",
    email: "", emergency_contact1: "", emergency_contact2: "", reception_no1: "", reception_no2: "",
    owner_name: "", manager_name: "", manager_phone: "",
    admin_name: "", admin_email: "", admin_password: "", admin_phone: "", admin_nid: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
      "Authorization": `Bearer ${token}`,
    };
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity],
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Limit to 8 images max
      const newFiles = Array.from(files).slice(0, Math.max(0, 8 - uploadedImages.length));
      setUploadedImages([...uploadedImages, ...newFiles]);

      // Create previews
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.city || !formData.admin_email || !formData.admin_name || !formData.admin_password) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required hotel and admin details.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Upload images if provided (max 8)
      let imageUrls: string[] = [];
      if (uploadedImages.length > 0) {
        // For now, we'll use the data URLs as image URLs
        // In production, these should be uploaded to a server/cloud storage
        imageUrls = imagePreviews.slice(0, 8);
      }

      // Step 2: Create hotel with amenities and images
      const hotelResponse = await fetch("/api/hotels/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          name: formData.name,
          city: formData.city,
          address: formData.address,
          zip_code: formData.zipCode,
          description: formData.description,
          hotel_type: formData.hotel_type,
          star_rating: Number(formData.star_rating),
          email: formData.email,
          emergency_contact1: formData.emergency_contact1,
          emergency_contact2: formData.emergency_contact2,
          reception_no1: formData.reception_no1,
          reception_no2: formData.reception_no2,
          owner_name: formData.owner_name,
          manager_name: formData.manager_name,
          manager_phone: formData.manager_phone,
          images: imageUrls, // Pass array of image URLs
          amenities: selectedAmenities,
        }),
      });

      const hotelData = await hotelResponse.json();

      if (!hotelResponse.ok) {
        throw new Error(hotelData.message || "Failed to create hotel");
      }

      const hotelId = hotelData.data.hotel_id;

      // Step 3: Create hotel admin (in hotel_admins table)
      const adminResponse = await fetch("/api/hotel-admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          hotel_id: hotelId,
          name: formData.admin_name,
          email: formData.admin_email,
          password: formData.admin_password,
          phone: formData.admin_phone,
          nid_no: formData.admin_nid,
        }),
      });

      const adminData = await adminResponse.json();

      if (!adminResponse.ok) {
        throw new Error(adminData.message || "Failed to create hotel admin");
      }

      toast({
        title: "Success",
        description: `${formData.name} and admin account created successfully!`,
      });

      navigate("/admin/hotels");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create hotel",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`flex items-center gap-4 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <Button variant="outline" size="icon" onClick={() => navigate("/admin/hotels")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Add New Hotel</h1>
          <p className="text-muted-foreground">Register a new property and create its hotel system admin account.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hotel Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Grand Palace Hotel"
                />
              </div>
              <div className="space-y-2">
                <Label>Location (City) *</Label>
                <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {bangladeshCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full address"
                />
              </div>
              <div className="space-y-2">
                <Label>Zip Code</Label>
                <Input
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="Postal code"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Hotel description..."
                className="min-h-24"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hotel Type</Label>
                <Select value={formData.hotel_type} onValueChange={(value) => setFormData({ ...formData, hotel_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="boutique">Boutique</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Star Rating</Label>
                <Select value={formData.star_rating} onValueChange={(value) => setFormData({ ...formData, star_rating: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <SelectItem key={star} value={String(star)}>
                        {star} Star{star > 1 && "s"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Owner's Name</Label>
                <Input
                  value={formData.owner_name}
                  onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                  placeholder="Hotel owner"
                />
              </div>
              <div className="space-y-2">
                <Label>Hotel Manager Name</Label>
                <Input
                  value={formData.manager_name}
                  onChange={(e) => setFormData({ ...formData, manager_name: e.target.value })}
                  placeholder="Manager name"
                />
              </div>
              <div className="space-y-2">
                <Label>Manager's Phone</Label>
                <Input
                  value={formData.manager_phone}
                  onChange={(e) => setFormData({ ...formData, manager_phone: e.target.value })}
                  placeholder="+880-XXX-XXXXXX"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotel Admin Account */}
        <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "180ms" }}>
          <CardHeader>
            <CardTitle>Hotel System Admin Account *</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Admin Name *</Label>
                <Input
                  value={formData.admin_name}
                  onChange={(e) => setFormData({ ...formData, admin_name: e.target.value })}
                  placeholder="Admin full name"
                />
              </div>
              <div className="space-y-2">
                <Label>Admin Email *</Label>
                <Input
                  type="email"
                  value={formData.admin_email}
                  onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
                  placeholder="admin@hotel.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Password *</Label>
                <Input
                  type="password"
                  value={formData.admin_password}
                  onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })}
                  placeholder="Secure password"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.admin_phone}
                  onChange={(e) => setFormData({ ...formData, admin_phone: e.target.value })}
                  placeholder="+880-XXX-XXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label>NID No.</Label>
                <Input
                  value={formData.admin_nid}
                  onChange={(e) => setFormData({ ...formData, admin_nid: e.target.value })}
                  placeholder="National ID number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "260ms" }}>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Hotel Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="hotel@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Emergency Contact 1</Label>
                <Input
                  value={formData.emergency_contact1}
                  onChange={(e) => setFormData({ ...formData, emergency_contact1: e.target.value })}
                  placeholder="+880-XXX-XXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact 2</Label>
                <Input
                  value={formData.emergency_contact2}
                  onChange={(e) => setFormData({ ...formData, emergency_contact2: e.target.value })}
                  placeholder="+880-XXX-XXXXXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Reception Number 1</Label>
                <Input
                  value={formData.reception_no1}
                  onChange={(e) => setFormData({ ...formData, reception_no1: e.target.value })}
                  placeholder="+880-XXX-XXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label>Reception Number 2</Label>
                <Input
                  value={formData.reception_no2}
                  onChange={(e) => setFormData({ ...formData, reception_no2: e.target.value })}
                  placeholder="+880-XXX-XXXXXX"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "340ms" }}>
          <CardHeader>
            <CardTitle>Hotel Images (Max 8)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Hotel preview ${index + 1}`}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {uploadedImages.length < 8 && (
              <label className="cursor-pointer rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary hover:bg-primary/5">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={uploadedImages.length >= 8}
                  className="hidden"
                />
                <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop images here, or click to browse ({uploadedImages.length}/8)
                </p>
              </label>
            )}
          </CardContent>
        </Card>

        {/* Hotel Amenities */}
        <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "420ms" }}>
          <CardHeader>
            <CardTitle>Hotel Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {hotelAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-2 text-sm transition-colors hover:text-primary"
                >
                  <Checkbox
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/hotels")}>
            Cancel
          </Button>
          <Button type="submit" variant="hero" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Hotel"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddHotel;
