import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Navigate } from "react-router-dom";
import AlumniProfile from "./AlumniProfile";

// Existing student profile page content
const StudentProfile = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p>Student profile content would go here...</p>
        {/* Rest of student profile content */}
      </div>
    </MainLayout>
  );
};

const Profile = () => {
  const { role } = useAuth();
  
  if (role === "alumni") {
    return <AlumniProfile />;
  } else if (role === "student") {
    return <StudentProfile />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default Profile;
