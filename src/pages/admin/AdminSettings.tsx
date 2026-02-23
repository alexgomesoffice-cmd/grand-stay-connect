import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">Platform configuration and preferences</p>
      </div>

      <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Name</Label><Input defaultValue="John Doe" /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue="admin@stayvista.com" /></div>
          </div>
        </CardContent>
      </Card>

      <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><Label>Email notifications</Label><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><Label>New hotel registrations</Label><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><Label>Booking alerts</Label><Switch defaultChecked /></div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="hero" onClick={() => toast({ title: "Settings Saved!" })}>Save Settings</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
