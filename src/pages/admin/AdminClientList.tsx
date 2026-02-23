import { useState, useEffect } from "react";
import { Search, Mail, Phone, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const mockClients = [
  { id: 1, name: "Emma Wilson", email: "emma@email.com", phone: "+1 555 1234", bookings: 5, joined: "Jan 2023", avatar: "EW" },
  { id: 2, name: "Michael Chen", email: "michael@email.com", phone: "+1 555 5678", bookings: 3, joined: "Mar 2023", avatar: "MC" },
  { id: 3, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 555 9012", bookings: 8, joined: "Nov 2022", avatar: "SJ" },
  { id: 4, name: "David Brown", email: "david@email.com", phone: "+1 555 3456", bookings: 2, joined: "Jul 2023", avatar: "DB" },
  { id: 5, name: "Lisa Anderson", email: "lisa@email.com", phone: "+1 555 7890", bookings: 12, joined: "Sep 2022", avatar: "LA" },
];

const AdminClientList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => { setIsLoaded(true); }, []);

  const filtered = mockClients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <h1 className="text-2xl sm:text-3xl font-bold">Client List</h1>
        <p className="text-muted-foreground">All registered consumers on the platform</p>
      </div>

      <div className={`relative ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search clients by name or email..." className="pl-10 max-w-md" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <Card key={client.id} className={`hover-lift transition-all ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 2) * 80}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary-foreground">{client.avatar}</span>
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-semibold">{client.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> {client.email}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> {client.phone}</p>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{client.bookings} bookings</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {client.joined}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No clients found.</p>}
    </div>
  );
};

export default AdminClientList;
