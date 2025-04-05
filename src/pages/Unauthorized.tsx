
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-4">
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-6">
          You don't have permission to access this page. 
          {role && <span> Your current role is <strong className="capitalize">{role}</strong>.</span>}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Button 
            onClick={() => navigate("/dashboard")} 
            className="bg-skillsage-primary hover:bg-skillsage-primary/90"
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
