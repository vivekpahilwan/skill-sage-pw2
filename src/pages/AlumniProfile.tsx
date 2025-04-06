
import React from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Mock data for the alumni profile
const alumniProfile = {
  id: "3",
  name: "Mike Johnson",
  role: "alumni",
  email: "alumni@example.com",
  avatar: "https://i.pravatar.cc/150?img=3",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  company: "Tech Innovations Inc.",
  position: "Senior Software Engineer",
  graduationYear: "2018",
  department: "Computer Science",
  skills: ["JavaScript", "React", "Node.js", "AWS", "Python", "Data Analysis"],
  bio: "Experienced software engineer with a passion for building scalable web applications. Currently working on cloud-based solutions at Tech Innovations Inc. Graduated from the university in 2018 with a degree in Computer Science.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/mike-johnson",
    github: "https://github.com/mikej",
    website: "https://mikejohnson.dev"
  }
};

const AlumniProfile: React.FC = () => {
  const { user } = useAuth();
  
  const handleEditProfile = () => {
    // In a real app, this would navigate to an edit profile page or open a modal
    toast.info("Edit profile functionality would open here");
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button onClick={handleEditProfile} className="mt-4 sm:mt-0">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={alumniProfile.avatar || user?.avatar} alt={alumniProfile.name} />
                <AvatarFallback>{alumniProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{alumniProfile.name}</CardTitle>
              <div className="text-muted-foreground">{alumniProfile.position}</div>
              <Badge className="mt-2">{alumniProfile.role}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{alumniProfile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{alumniProfile.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{alumniProfile.location}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{alumniProfile.company}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Graduated {alumniProfile.graduationYear}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{alumniProfile.department}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={alumniProfile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={alumniProfile.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </Button>
                <Button variant="outline" size="sm" className="w-full col-span-2" asChild>
                  <a href={alumniProfile.socialLinks.website} target="_blank" rel="noopener noreferrer">Personal Website</a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>Bio</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{alumniProfile.bio}</p>
              </CardContent>
            </Card>
            
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {alumniProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Contribution Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Contribution Statistics</CardTitle>
                <CardDescription>Your impact on the university community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Jobs Posted</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-muted-foreground">Students Referred</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Seminars Conducted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AlumniProfile;
