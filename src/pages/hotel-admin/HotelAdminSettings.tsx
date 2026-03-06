import { useState } from "react";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "hotelAdminProfile";

const getProfile = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {
    name: "Maria Garcia", email: "maria@hotelmanager.com", phone: "+1 234 567 890",
    dob: "1990-05-15", nid: "NID-9876543210", address: "123 Hotel Street, Miami, FL",
    role: "Hotel System Admin",
  };
};

const HotelAdminSettings = () => {
  const [profile, setProfile] = useState(getProfile);
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    "New Reservations": true, "Guest Check-in/out": true, "Review Alerts": true, "Revenue Reports": true,
  });

  const update = (field: string, value: string) => setProfile((p: any) => ({ ...p, [field]: value }));

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    toast({ title: "Settings Saved", description: "Your preferences have been updated." });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full Name</Label><Input value={profile.name} onChange={(e) => update("name", e.target.value)} /></div>
            <div className="space-y-2"><Label>Email</Label><Input value={profile.email} disabled className="opacity-60" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Phone</Label><Input value={profile.phone} onChange={(e) => update("phone", e.target.value)} /></div>
            <div className="space-y-2"><Label>Date of Birth</Label><Input type="date" value={profile.dob} onChange={(e) => update("dob", e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>NID No.</Label><Input value={profile.nid} disabled className="opacity-60" /></div>
            <div className="space-y-2"><Label>Role</Label><Input value={profile.role} disabled className="opacity-60" /></div>
          </div>
          <div className="space-y-2"><Label>Address</Label><Input value={profile.address} onChange={(e) => update("address", e.target.value)} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {Object.keys(notifications).map((item) => (
            <div key={item} className="flex items-center justify-between">
              <Label>{item}</Label>
              <Switch checked={notifications[item]} onCheckedChange={(v) => setNotifications((p) => ({ ...p, [item]: v }))} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button variant="hero" onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
    </div>
  );
};

export default HotelAdminSettings;
