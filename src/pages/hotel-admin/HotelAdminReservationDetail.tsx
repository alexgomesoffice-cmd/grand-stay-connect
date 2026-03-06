import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, BedDouble, DollarSign, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const allReservations = [
  { id: "RES-001", guest: "Alice Martin", guestId: "g1", room: "Suite 301", roomType: "Suite", checkIn: "2025-02-20", checkOut: "2025-02-24", status: "confirmed", total: "$1,400", nights: 4, guests: 2, email: "alice@email.com", phone: "+1 555 0101", paymentMethod: "Visa •••• 4242", bookedAt: "2025-02-10" },
  { id: "RES-002", guest: "Robert Kim", guestId: "g2", room: "Deluxe 205", roomType: "Deluxe", checkIn: "2025-02-21", checkOut: "2025-02-23", status: "checked-in", total: "$440", nights: 2, guests: 1, email: "robert@email.com", phone: "+1 555 0102", paymentMethod: "Mastercard •••• 1234", bookedAt: "2025-02-15" },
  { id: "RES-003", guest: "Sophie Chen", guestId: "g3", room: "Standard 112", roomType: "Standard", checkIn: "2025-02-18", checkOut: "2025-02-21", status: "checked-out", total: "$360", nights: 3, guests: 2, email: "sophie@email.com", phone: "+1 555 0103", paymentMethod: "Visa •••• 5678", bookedAt: "2025-02-12" },
  { id: "RES-004", guest: "James Wilson", guestId: "g4", room: "Suite 402", roomType: "Suite", checkIn: "2025-02-22", checkOut: "2025-02-26", status: "pending", total: "$1,600", nights: 4, guests: 3, email: "james@email.com", phone: "+1 555 0104", paymentMethod: "Amex •••• 9012", bookedAt: "2025-02-18" },
  { id: "RES-005", guest: "Emma Davis", guestId: "g5", room: "Deluxe 310", roomType: "Deluxe", checkIn: "2025-02-23", checkOut: "2025-02-25", status: "confirmed", total: "$500", nights: 2, guests: 2, email: "emma@email.com", phone: "+1 555 0105", paymentMethod: "Visa •••• 3456", bookedAt: "2025-02-19" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-green-500/10 text-green-500",
  "checked-in": "bg-blue-500/10 text-blue-500",
  "checked-out": "bg-muted text-muted-foreground",
  pending: "bg-amber-500/10 text-amber-500",
  cancelled: "bg-destructive/10 text-destructive",
};

const HotelAdminReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reservation = allReservations.find((r) => r.id === id);

  if (!reservation) return (
    <div className="text-center py-20">
      <h2 className="text-xl font-bold mb-2">Reservation not found</h2>
      <Button variant="outline" onClick={() => navigate("/hotel-admin/reservations")}>Back to Reservations</Button>
    </div>
  );

  const handleCancel = () => {
    toast({ title: "Reservation Cancelled", description: `${reservation.id} has been cancelled.` });
    navigate("/hotel-admin/reservations");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/hotel-admin/reservations")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Reservation {reservation.id}</h1>
          <p className="text-muted-foreground">Booked on {reservation.bookedAt}</p>
        </div>
        <Badge className={`text-sm px-3 py-1 ${statusColors[reservation.status]}`}>{reservation.status}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Guest Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-muted-foreground">Name</span><Link to={`/hotel-admin/guest/${reservation.guestId}`} className="font-medium text-primary hover:underline">{reservation.guest}</Link></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{reservation.email}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium">{reservation.phone}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Guests</span><span className="font-medium">{reservation.guests}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><BedDouble className="h-5 w-5" /> Room Details</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-muted-foreground">Room</span><span className="font-medium">{reservation.room}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{reservation.roomType}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Nights</span><span className="font-medium">{reservation.nights}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Stay Period</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span className="font-medium">{reservation.checkIn}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span className="font-medium">{reservation.checkOut}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" /> Payment</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold text-lg">{reservation.total}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span className="font-medium">{reservation.paymentMethod}</span></div>
          </CardContent>
        </Card>
      </div>

      {reservation.status !== "cancelled" && reservation.status !== "checked-out" && (
        <div className="flex justify-end">
          <Button variant="destructive" onClick={handleCancel}><XCircle className="h-4 w-4 mr-2" /> Cancel Reservation</Button>
        </div>
      )}
    </div>
  );
};

export default HotelAdminReservationDetail;
