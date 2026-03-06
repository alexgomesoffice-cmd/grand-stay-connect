import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const reservations = [
  { id: "RES-001", guest: "Alice Martin", guestId: "g1", room: "Suite 301", roomType: "Suite", checkIn: "2025-02-20", checkOut: "2025-02-24", status: "confirmed", total: "$1,400" },
  { id: "RES-002", guest: "Robert Kim", guestId: "g2", room: "Deluxe 205", roomType: "Deluxe", checkIn: "2025-02-21", checkOut: "2025-02-23", status: "checked-in", total: "$440" },
  { id: "RES-003", guest: "Sophie Chen", guestId: "g3", room: "Standard 112", roomType: "Standard", checkIn: "2025-02-18", checkOut: "2025-02-21", status: "checked-out", total: "$360" },
  { id: "RES-004", guest: "James Wilson", guestId: "g4", room: "Suite 402", roomType: "Suite", checkIn: "2025-02-22", checkOut: "2025-02-26", status: "pending", total: "$1,600" },
  { id: "RES-005", guest: "Emma Davis", guestId: "g5", room: "Deluxe 310", roomType: "Deluxe", checkIn: "2025-02-23", checkOut: "2025-02-25", status: "confirmed", total: "$500" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-green-500/10 text-green-500",
  "checked-in": "bg-blue-500/10 text-blue-500",
  "checked-out": "bg-muted text-muted-foreground",
  pending: "bg-amber-500/10 text-amber-500",
  cancelled: "bg-destructive/10 text-destructive",
};

const HotelAdminReservations = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roomTypeFilter, setRoomTypeFilter] = useState("all");

  const filtered = reservations.filter((r) => {
    const matchSearch = r.guest.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.room.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchType = roomTypeFilter === "all" || r.roomType.toLowerCase() === roomTypeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const handleCancel = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toast({ title: "Reservation Cancelled", description: `${id} has been cancelled.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Reservations</h1>
        <p className="text-muted-foreground">Manage guest bookings and check-ins</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by guest, ID, or room..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Room Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["ID", "Guest", "Room", "Check-in", "Check-out", "Total", "Status", ""].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => navigate(`/hotel-admin/reservations/${r.id}`)}>
                    <td className="py-3 px-4 font-mono text-sm">{r.id}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/hotel-admin/guest/${r.guestId}`}
                        className="font-medium text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {r.guest}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{r.room}</td>
                    <td className="py-3 px-4 text-sm">{r.checkIn}</td>
                    <td className="py-3 px-4 text-sm">{r.checkOut}</td>
                    <td className="py-3 px-4 font-medium">{r.total}</td>
                    <td className="py-3 px-4"><Badge className={statusColors[r.status]}>{r.status}</Badge></td>
                    <td className="py-3 px-4">
                      {r.status !== "checked-out" && r.status !== "cancelled" && (
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={(e) => handleCancel(e, r.id)}>
                          <XCircle className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No reservations match your criteria.</div>
      )}
    </div>
  );
};

export default HotelAdminReservations;
