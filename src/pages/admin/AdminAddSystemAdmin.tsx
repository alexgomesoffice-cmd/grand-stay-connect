import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminAddSystemAdmin = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Feature Not Implemented",
      description: "System admin creation requires backend API endpoint (POST /api/system-admins)",
      variant: "destructive",
    });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`flex items-center gap-4 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
        <Button variant="outline" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Add System Admin</h1>
          <p className="text-muted-foreground">Create another platform administrator with full admin access.</p>
        </div>
      </div>

      <Card className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Feature Requires Backend API</h3>
              <p className="text-sm text-amber-800 mb-4">
                System admin creation requires the following backend endpoint:
              </p>
              <code className="block bg-amber-100 rounded p-2 text-xs font-mono text-amber-900">
                POST /api/system-admins
              </code>
              <p className="text-sm text-amber-800 mt-4">
                Please set up the system admin creation endpoint in your backend before using this feature.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/admin")}>Go Back</Button>
        <Button type="button" variant="hero" disabled onClick={handleSubmit}>
          Create System Admin (Disabled)
        </Button>
      </div>
    </div>
  );
};

export default AdminAddSystemAdmin;
