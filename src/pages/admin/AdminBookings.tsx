import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const bookings = [
  { id: 1, guest: "Emma Wilson", hotel: "Grand Palace Hotel", room: "Suite 301", checkIn: "Feb 15", checkOut: "Feb 18", amount: "$840", status: "confirmed" },
  { id: 2, guest: "Michael Chen", hotel: "Ocean View Resort", room: "Deluxe 205", checkIn: "Feb 16", checkOut: "Feb 20", amount: "$780", status: "pending" },
  { id: 3, guest: "Sarah Johnson", hotel: "Nordic Forest Lodge", room: "Cabin 12", checkIn: "Feb 17", checkOut: "Feb 19", amount: "$330", status: "confirmed" },
  { id: 4, guest: "David Brown", hotel: "Tropical Paradise Villa", room: "Villa A", checkIn: "Feb 18", checkOut: "Feb 25", amount: "$2,240", status: "confirmed" },
  { id: 5, guest: "Lisa Anderson", hotel: "Grand Palace Hotel", room: "Standard 112", checkIn: "Feb 19", checkOut: "Feb 21", amount: "$560", status: "cancelled" },
];

const AdminBookings = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className="space-y-6">
      <div className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <h1 className="text-2xl sm:text-3xl font-bold">All Bookings</h1>
        <p className="text-muted-foreground">Platform-wide booking management</p>
      </div>
      <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Guest</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Hotel</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Room</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Check-in</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Check-out</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{b.guest}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{b.hotel}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{b.room}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{b.checkIn}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{b.checkOut}</td>
                    <td className="py-3 px-4 font-medium">{b.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        b.status === "confirmed" ? "bg-green-500/10 text-green-500"
                          : b.status === "pending" ? "bg-amber-500/10 text-amber-500"
                          : "bg-destructive/10 text-destructive"
                      }`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBookings;
