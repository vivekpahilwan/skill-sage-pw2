import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Navigate } from "react-router-dom";
import AlumniProfile from "./AlumniProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

// New actual alumni profile component (instead of just redirecting to AlumniProfile)
const ActualAlumniProfile = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Alumni Profile</h1>
          <Button>Edit Profile</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">Rahul Agarwal</h2>
                <p className="text-muted-foreground">Senior Software Engineer</p>
                <p className="text-muted-foreground">TechCorp Solutions</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">rahul.agarwal@gmail.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Year of Graduation</p>
                  <p className="text-sm text-muted-foreground">2018</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm text-muted-foreground">Computer Science</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Role</h3>
                <p className="mb-1"><span className="font-medium">Position:</span> Senior Software Engineer</p>
                <p className="mb-1"><span className="font-medium">Company:</span> TechCorp Solutions</p>
                <p><span className="font-medium">Duration:</span> 2020 - Present</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Previous Experience</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Software Engineer</p>
                    <p className="text-sm text-muted-foreground">InnoTech Pvt. Ltd. (2018 - 2020)</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Education</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">B.Tech in Computer Science</p>
                    <p className="text-sm text-muted-foreground">XYZ Institute of Technology (2014 - 2018)</p>
                    <p className="text-sm text-muted-foreground">CGPA: 8.7/10</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>JavaScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>AWS</Badge>
                  <Badge>Docker</Badge>
                  <Badge>CI/CD</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

const Profile = () => {
  const { role } = useAuth();
  
  if (role === "alumni") {
    return <ActualAlumniProfile />;
  } else if (role === "student") {
    return <StudentProfile />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default Profile;
