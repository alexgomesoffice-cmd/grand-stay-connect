import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, DollarSign, Users, Edit, Search, Filter, LayoutGrid, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockRooms = [
  { id: 1, name: "Suite 301", type: "Suite", price: 350, capacity: 4, status: "occupied", guest: "Alice Martin" },
  { id: 2, name: "Deluxe 205", type: "Deluxe", price: 220, capacity: 2, status: "occupied", guest: "Robert Kim" },
  { id: 3, name: "Standard 112", type: "Standard", price: 120, capacity: 2, status: "available", guest: null },
  { id: 4, name: "Suite 402", type: "Suite", price: 400, capacity: 4, status: "maintenance", guest: null },
  { id: 5, name: "Deluxe 310", type: "Deluxe", price: 250, capacity: 3, status: "available", guest: null },
  { id: 6, name: "Standard 115", type: "Standard", price: 110, capacity: 2, status: "occupied", guest: "Sophie Chen" },
];

const statusColors: Record<string, string> = {
  occupied: "bg-green-500/10 text-green-500",
  available: "bg-blue-500/10 text-blue-500",
  maintenance: "bg-amber-500/10 text-amber-500",
};

const HotelAdminRooms = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = mockRooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase()) || (room.guest?.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    const matchesType = typeFilter === "all" || room.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Rooms</h1>
          <p className="text-muted-foreground">Manage rooms for your hotel</p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/hotel-admin/add-room"><Plus className="h-4 w-4 mr-2" /> Add Room</Link>
        </Button>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by room number or guest..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border border-border rounded-xl overflow-hidden">
              <button onClick={() => setViewMode("grid")} className={`p-3 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-3 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((room) => (
            <Card key={room.id} className="hover-lift transition-all duration-300">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{room.name}</h3>
                    <p className="text-sm text-muted-foreground">{room.type}</p>
                  </div>
                  <Badge className={statusColors[room.status]}>{room.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />${room.price}/night</span>
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" />{room.capacity} guests</span>
                </div>
                {room.guest && <p className="text-sm"><span className="text-muted-foreground">Guest:</span> {room.guest}</p>}
                <Button variant="outline" size="sm" className="w-full"><Edit className="h-4 w-4 mr-2" /> Edit Room</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Room", "Type", "Price", "Capacity", "Guest", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((room) => (
                    <tr key={room.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{room.name}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{room.type}</td>
                      <td className="py-3 px-4 text-sm">${room.price}/night</td>
                      <td className="py-3 px-4 text-sm">{room.capacity}</td>
                      <td className="py-3 px-4 text-sm">{room.guest || "—"}</td>
                      <td className="py-3 px-4"><Badge className={statusColors[room.status]}>{room.status}</Badge></td>
                      <td className="py-3 px-4"><Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-1" /> Edit</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No rooms match your search criteria.</div>
      )}
    </div>
  );
};

export default HotelAdminRooms;
