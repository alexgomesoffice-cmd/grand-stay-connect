import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const HotelAdminAddSubAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", nid: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.nid) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    const existing = JSON.parse(localStorage.getItem("hotelSubAdmins") || "[]");
    existing.push({ ...formData, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    localStorage.setItem("hotelSubAdmins", JSON.stringify(existing));
    toast({ title: "Sub Admin Added!", description: `${formData.name} has been registered as a sub admin.` });
    navigate("/hotel-admin");
  };

  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/hotel-admin")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Add Hotel Sub Admin</h1>
          <p className="text-muted-foreground">Register a new sub admin for your hotel</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Sub Admin Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Full Name *</Label><Input placeholder="John Doe" value={formData.name} onChange={(e) => update("name", e.target.value)} /></div>
              <div className="space-y-2"><Label>Email *</Label><Input type="email" placeholder="john@hotel.com" value={formData.email} onChange={(e) => update("email", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Password *</Label><Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => update("password", e.target.value)} /></div>
              <div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 234 567 890" value={formData.phone} onChange={(e) => update("phone", e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>NID No. *</Label><Input placeholder="National ID Number" value={formData.nid} onChange={(e) => update("nid", e.target.value)} /></div>
          </CardContent>
        </Card>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" type="button" onClick={() => navigate("/hotel-admin")}>Cancel</Button>
          <Button variant="hero" type="submit"><UserPlus className="h-4 w-4 mr-2" /> Register Sub Admin</Button>
        </div>
      </form>
    </div>
  );
};

export default HotelAdminAddSubAdmin;
