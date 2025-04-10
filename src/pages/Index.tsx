
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect after authentication status is determined
    if (!isLoading) {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated, navigate, isLoading]);

  // Show a simple loading state while determining auth status
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>
  );
};

export default Index;
