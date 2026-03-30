import { apiGet } from "@/utils/api";

export interface PublicHotel {
  hotel_id: number;
  name: string;
  city: string | null;
  address: string | null;
  hotel_type: string | null;
  hotel_images?: { image_url: string; is_cover?: boolean }[];
  hotel_details?: { description?: string | null; star_rating?: number | string | null };
  hotel_amenities?: { amenity: { name: string } }[];
  hotel_rooms?: { base_price: number | string; room_type?: string | null }[];
  // ...add more fields as needed for the card
}

export async function fetchPublicHotels(params?: {
  location?: string;
  check_in?: string;
  check_out?: string;
  guests?: number;
  rooms?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.location) queryParams.append("location", params.location);
  if (params?.check_in) queryParams.append("check_in", params.check_in);
  if (params?.check_out) queryParams.append("check_out", params.check_out);
  if (params?.guests) queryParams.append("guests", String(params.guests));
  if (params?.rooms) queryParams.append("rooms", String(params.rooms));

  const endpoint = `/end-users/hotels${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const response = await apiGet(endpoint);
  console.log("Fetch Public Hotels Response:", response);
  if (response.success === false) {
    throw new Error(response.message || "Failed to fetch hotels");
  }
  return response.hotels || [];
}
