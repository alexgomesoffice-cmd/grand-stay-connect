import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, AlertTriangle, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const initialClients = [
  { id: 1, name: "Emma Wilson", email: "emma@email.com", bookings: 5, avatar: "EW" },
  { id: 2, name: "Michael Chen", email: "michael@email.com", bookings: 3, avatar: "MC" },
  { id: 3, name: "Sarah Johnson", email: "sarah@email.com", bookings: 8, avatar: "SJ" },
  { id: 4, name: "David Brown", email: "david@email.com", bookings: 2, avatar: "DB" },
];

const AdminEraseClient = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<number | null>(null);

  useEffect(() => { setIsLoaded(true); }, []);

  const filtered = clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: number) => {
    const client = clients.find((c) => c.id === id);
    setClients(clients.filter((c) => c.id !== id));
    setConfirmId(null);
    toast({ title: "Client Erased", description: `${client?.name} has been permanently removed.` });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`flex items-center gap-4 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <Button variant="outline" size="icon" onClick={() => navigate("/admin/clients")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Erase Client</h1>
          <p className="text-muted-foreground">Permanently remove a consumer from the platform</p>
        </div>
      </div>

      <div className={`relative ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search clients..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="space-y-4">
        {filtered.map((client, i) => (
          <Card key={client.id} className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 2) * 100}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-primary-foreground">{client.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">{client.email} · {client.bookings} bookings</p>
                  </div>
                </div>
                {confirmId === client.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-destructive flex items-center gap-1"><AlertTriangle className="h-4 w-4" /> Confirm?</span>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(client.id)}>Yes, Erase</Button>
                    <Button variant="outline" size="sm" onClick={() => setConfirmId(null)}>Cancel</Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setConfirmId(client.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Erase
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No clients found.</p>}
      </div>
    </div>
  );
};

export default AdminEraseClient;
