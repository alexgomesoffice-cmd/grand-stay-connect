/**
 * Admin Dashboard API Service
 * 
 * Fetches real data from backend for admin dashboards
 * Provides functions to get hotels, bookings, clients, etc.
 */

import { apiGet } from "@/utils/api";

export interface HotelResponse {
  hotel_id: number;
  name: string;
  email: string | null;
  address: string | null;
  city: string | null;
  hotel_type: string | null;
  owner_name: string | null;
  description: string | null;
  star_rating: number | null;
  approval_status: string;
  created_at: string;
  updated_at: string;
}

export interface BookingResponse {
  booking_id: number;
  room_id: number;
  end_user_id: number;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
  booking_status: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface EndUserResponse {
  end_user_id: number;
  email: string;
  name: string | null;
  is_blocked: boolean;
  deleted_at: string | null;
  created_at: string;
}

/**
 * Fetch all hotels from backend
 * GET /api/hotels
 */
export async function fetchHotels(
  params?: {
    page?: number;
    limit?: number;
    city?: string;
    approval_status?: string;
  }
) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", String(params.page));
  if (params?.limit) queryParams.append("limit", String(params.limit));
  if (params?.city) queryParams.append("city", params.city);
  if (params?.approval_status) queryParams.append("approval_status", params.approval_status);

  const endpoint = `/hotels${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const response = await apiGet(endpoint);

  console.log("Fetch Hotels Response:", response);

  // Handle different response formats
  if (response.success === false) {
    throw new Error(response.message || "Failed to fetch hotels");
  }

  // API returns { data: { hotels: [...], total, skip, take } }
  const hotelsData = response.data?.hotels || response.data;

  // Ensure it's an array
  if (!Array.isArray(hotelsData)) {
    console.warn("Hotels response is not an array:", hotelsData);
    return [];
  }

  return hotelsData as HotelResponse[];
}

/**
 * Fetch all bookings from backend
 * GET /api/bookings
 */
export async function fetchBookings(
  params?: {
    page?: number;
    limit?: number;
    booking_status?: string;
    payment_status?: string;
  }
) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", String(params.page));
  if (params?.limit) queryParams.append("limit", String(params.limit));
  if (params?.booking_status) queryParams.append("booking_status", params.booking_status);
  if (params?.payment_status) queryParams.append("payment_status", params.payment_status);

  const endpoint = `/bookings${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const response = await apiGet(endpoint);

  console.log("Fetch Bookings Response:", response);

  // Handle different response formats
  if (response.success === false) {
    throw new Error(response.message || "Failed to fetch bookings");
  }

  // API returns { data: { bookings: [...], total, skip, take } }
  const bookingsData = response.data?.bookings || response.data;

  // Ensure it's an array
  if (!Array.isArray(bookingsData)) {
    console.warn("Bookings response is not an array:", bookingsData);
    return [];
  }

  return bookingsData as BookingResponse[];
}

/**
 * Fetch all end users from backend
 * GET /api/end-users (if endpoint exists, otherwise filter from bookings)
 */
export async function fetchEndUsers(
  params?: {
    page?: number;
    limit?: number;
  }
) {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", String(params.page));
    if (params?.limit) queryParams.append("limit", String(params.limit));

    const endpoint = `/end-users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await apiGet(endpoint);

    console.log("Fetch End Users Response:", response);

    // Handle different response formats
    if (response.success === false) {
      throw new Error(response.message || "Failed to fetch end users");
    }

    // API returns { data: { end_users: [...], total, skip, take } } or similar
    const usersData = response.data?.end_users || response.data?.users || response.data;

    // Ensure it's an array
    if (!Array.isArray(usersData)) {
      console.warn("End users response is not an array:", usersData);
      return [];
    }

    return usersData as EndUserResponse[];
  } catch (error) {
    console.warn("Could not fetch end users from dedicated endpoint, falling back to empty array", error);
    return [];
  }
}

/**
 * Fetch a single hotel by ID
 * GET /api/hotels/:id
 */
export async function fetchHotelById(hotelId: number) {
  const response = await apiGet(`/hotels/${hotelId}`);

  console.log("Fetch Hotel By ID Response:", response);

  if (response.success === false) {
    throw new Error(response.message || "Failed to fetch hotel");
  }

  const data = response.data || response;
  return data as HotelResponse;
}

/**
 * Fetch a single booking by ID
 * GET /api/bookings/:id
 */
export async function fetchBookingById(bookingId: number) {
  const response = await apiGet(`/bookings/${bookingId}`);

  console.log("Fetch Booking By ID Response:", response);

  if (response.success === false) {
    throw new Error(response.message || "Failed to fetch booking");
  }

  const data = response.data || response;
  return data as BookingResponse;
}

/**
 * Get dashboard summary statistics
 * Calculates key metrics from the fetched data
 */
export async function getDashboardStats() {
  try {
    const [hotels, bookings] = await Promise.all([
      fetchHotels({ limit: 100 }),
      fetchBookings({ limit: 100 }),
    ]);

    const totalRevenue = bookings
      .filter((b) => b.payment_status === "paid")
      .reduce((sum, b) => sum + b.total_amount, 0);

    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter((b) => b.booking_status === "pending").length;
    const totalProperties = hotels.length;
    const publishedProperties = hotels.filter((h) => h.approval_status === "PUBLISHED").length;

    return {
      totalRevenue,
      totalBookings,
      pendingBookings,
      totalProperties,
      publishedProperties,
      hotels,
      bookings,
    };
  } catch (error) {
    console.error("Failed to get dashboard stats:", error);
    throw error;
  }
}
