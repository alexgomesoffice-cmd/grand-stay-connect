import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Hotel,
  Calendar,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

const stats = [
  {
    title: "Total Revenue",
    value: "$284,532",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Total Bookings",
    value: "1,847",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
    color: "from-primary to-accent",
  },
  {
    title: "Active Guests",
    value: "432",
    change: "-2.4%",
    trend: "down",
    icon: Users,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Properties",
    value: "28",
    change: "+4",
    trend: "up",
    icon: Hotel,
    color: "from-purple-500 to-pink-500",
  },
];

const recentBookings = [
  {
    id: 1,
    guest: "Emma Wilson",
    hotel: "Grand Palace Hotel",
    checkIn: "Feb 15, 2024",
    checkOut: "Feb 18, 2024",
    amount: "$840",
    status: "confirmed",
  },
  {
    id: 2,
    guest: "Michael Chen",
    hotel: "Ocean View Resort",
    checkIn: "Feb 16, 2024",
    checkOut: "Feb 20, 2024",
    amount: "$780",
    status: "pending",
  },
  {
    id: 3,
    guest: "Sarah Johnson",
    hotel: "Nordic Forest Lodge",
    checkIn: "Feb 17, 2024",
    checkOut: "Feb 19, 2024",
    amount: "$330",
    status: "confirmed",
  },
  {
    id: 4,
    guest: "David Brown",
    hotel: "Tropical Paradise Villa",
    checkIn: "Feb 18, 2024",
    checkOut: "Feb 25, 2024",
    amount: "$2,240",
    status: "confirmed",
  },
  {
    id: 5,
    guest: "Lisa Anderson",
    hotel: "Grand Palace Hotel",
    checkIn: "Feb 19, 2024",
    checkOut: "Feb 21, 2024",
    amount: "$560",
    status: "cancelled",
  },
];

const topHotels = [
  { name: "Grand Palace Hotel", bookings: 234, revenue: "$68,450", occupancy: 92 },
  { name: "Ocean View Resort", bookings: 198, revenue: "$52,320", occupancy: 88 },
  { name: "Nordic Forest Lodge", bookings: 156, revenue: "$41,860", occupancy: 85 },
  { name: "Tropical Paradise Villa", bookings: 142, revenue: "$56,200", occupancy: 78 },
];

const AdminDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
            isLoaded ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your properties.
            </p>
          </div>
          <Button variant="hero">Add New Property</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className={`relative overflow-hidden hover-lift ${
                isLoaded ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up" ? "text-green-500" : "text-destructive"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shrink-0`}
                  >
                    <stat.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                {/* Decorative gradient */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card
            className={`lg:col-span-2 ${
              isLoaded ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "500ms" }}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Button variant="ghost" size="sm">
                View all
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Guest
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Hotel
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                        Check-in
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="font-medium">{booking.guest}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {booking.hotel}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">
                          {booking.checkIn}
                        </td>
                        <td className="py-3 px-4 font-medium">{booking.amount}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-500/10 text-green-500"
                                : booking.status === "pending"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top Hotels */}
          <Card
            className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "600ms" }}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Properties</CardTitle>
              <button className="p-2 hover:bg-secondary rounded-lg">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {topHotels.map((hotel, index) => (
                <div
                  key={hotel.name}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{hotel.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {hotel.bookings} bookings
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gradient">{hotel.revenue}</p>
                    <p className="text-xs text-muted-foreground">{hotel.occupancy}% occ.</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
