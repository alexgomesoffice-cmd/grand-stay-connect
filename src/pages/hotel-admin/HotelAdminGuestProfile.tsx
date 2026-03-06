import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const guests: Record<string, any> = {
  g1: { name: "Alice Martin", email: "alice@email.com", phone: "+1 555 0101", dob: "1992-03-15", gender: "Female", address: "45 Park Ave, New York", country: "USA", totalStays: 5, totalSpent: "$4,200" },
  g2: { name: "Robert Kim", email: "robert@email.com", phone: "+1 555 0102", dob: "1988-07-22", gender: "Male", address: "12 Ocean Dr, Miami", country: "USA", totalStays: 3, totalSpent: "$1,800" },
  g3: { name: "Sophie Chen", email: "sophie@email.com", phone: "+1 555 0103", dob: "1995-11-08", gender: "Female", address: "88 Dragon St, San Francisco", country: "USA", totalStays: 2, totalSpent: "$960" },
  g4: { name: "James Wilson", email: "james@email.com", phone: "+1 555 0104", dob: "1985-01-30", gender: "Male", address: "7 King's Rd, London", country: "UK", totalStays: 7, totalSpent: "$8,400" },
  g5: { name: "Emma Davis", email: "emma@email.com", phone: "+1 555 0105", dob: "1993-06-12", gender: "Female", address: "23 Elm St, Boston", country: "USA", totalStays: 1, totalSpent: "$500" },
};

const HotelAdminGuestProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const guest = guests[id || ""];

  if (!guest) return (
    <div className="text-center py-20">
      <h2 className="text-xl font-bold mb-2">Guest not found</h2>
      <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{guest.name}</h1>
          <p className="text-muted-foreground">Guest Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{guest.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium flex items-center gap-1"><Mail className="h-3 w-3" />{guest.email}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium flex items-center gap-1"><Phone className="h-3 w-3" />{guest.phone}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date of Birth</span><span className="font-medium flex items-center gap-1"><Calendar className="h-3 w-3" />{guest.dob}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Gender</span><span className="font-medium">{guest.gender}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Location & Stats</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="font-medium">{guest.address}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span className="font-medium">{guest.country}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Stays</span><Badge variant="secondary">{guest.totalStays}</Badge></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Spent</span><span className="font-bold text-primary">{guest.totalSpent}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelAdminGuestProfile;
