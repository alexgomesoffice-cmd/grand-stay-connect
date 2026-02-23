import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Users, Hotel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { title: "Monthly Revenue", value: "$284,532", change: "+12.5%", icon: DollarSign, color: "from-green-500 to-emerald-500" },
  { title: "New Guests", value: "1,234", change: "+18%", icon: Users, color: "from-primary to-accent" },
  { title: "Occupancy Rate", value: "86%", change: "+5%", icon: Hotel, color: "from-purple-500 to-pink-500" },
  { title: "Growth Rate", value: "23%", change: "+3%", icon: TrendingUp, color: "from-orange-500 to-amber-500" },
];

const AdminAnalytics = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className="space-y-6">
      <div className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Platform performance and growth metrics</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={m.title} className={`relative overflow-hidden hover-lift ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{m.title}</p>
                  <p className="text-2xl font-bold">{m.value}</p>
                  <p className="text-sm text-green-500 mt-1">{m.change} vs last month</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${m.color}`}>
                  <m.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${m.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
        <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Chart visualization will appear here when connected to live data.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
