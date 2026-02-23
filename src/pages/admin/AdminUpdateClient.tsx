import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const mockClients = [
  { id: 1, name: "Emma Wilson", email: "emma@email.com", phone: "+1 555 1234", avatar: "EW" },
  { id: 2, name: "Michael Chen", email: "michael@email.com", phone: "+1 555 5678", avatar: "MC" },
  { id: 3, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 555 9012", avatar: "SJ" },
];

const AdminUpdateClient = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => { setIsLoaded(true); }, []);

  const filtered = mockClients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const selectClient = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setFormData({ name: client.name, email: client.email, phone: client.phone });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Client Updated!", description: `${formData.name}'s info has been updated.` });
    setSelectedClient(null);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`flex items-center gap-4 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <Button variant="outline" size="icon" onClick={() => navigate("/admin/clients")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Update Client Info</h1>
          <p className="text-muted-foreground">Search and edit consumer details</p>
        </div>
      </div>

      {!selectedClient ? (
        <>
          <div className={`relative ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="space-y-3">
            {filtered.map((client, i) => (
              <Card key={client.id} className={`cursor-pointer hover-lift transition-all ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 2) * 100}ms` }} onClick={() => selectClient(client)}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-primary-foreground">{client.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
            <CardHeader><CardTitle>Edit: {selectedClient.name}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" type="button" onClick={() => setSelectedClient(null)}>Back</Button>
            <Button variant="hero" type="submit"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminUpdateClient;
