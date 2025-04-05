
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { PlacementDashboard } from "@/components/dashboard/PlacementDashboard";
import { AlumniDashboard } from "@/components/dashboard/AlumniDashboard";
import { MainLayout } from "@/components/Layout/MainLayout";

const Dashboard: React.FC = () => {
  const { role } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case "student":
        return <StudentDashboard />;
      case "placement":
        return <PlacementDashboard />;
      case "alumni":
        return <AlumniDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <MainLayout>
      {renderDashboard()}
    </MainLayout>
  );
};

export default Dashboard;
