
import React from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  Book, 
  Calendar, 
  Edit, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  FileCheck
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { RouterGuard } from "@/components/RouterGuard";

const Profile: React.FC = () => {
  const { user } = useAuth();

  // Mock student data
  const studentProfile = {
    id: "1",
    name: "John Doe",
    email: "student@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    department: "Computer Science",
    year: "3rd Year",
    enrollmentNumber: "CS2022001",
    gpa: 3.8,
    contactInfo: {
      phone: "+1 (555) 123-4567",
      address: "123 Campus Drive, University City",
      linkedin: "linkedin.com/johndoe",
      github: "github.com/johndoe",
    },
    skills: [
      { name: "JavaScript", level: "Advanced", progress: 85 },
      { name: "React", level: "Intermediate", progress: 65 },
      { name: "Node.js", level: "Intermediate", progress: 70 },
      { name: "Python", level: "Beginner", progress: 40 },
      { name: "SQL", level: "Advanced", progress: 90 },
    ],
    education: [
      {
        degree: "Bachelor of Technology",
        field: "Computer Science",
        institution: "Tech University",
        startYear: 2022,
        endYear: 2026,
        current: true,
      },
      {
        degree: "High School",
        field: "Science and Mathematics",
        institution: "Central High School",
        startYear: 2020,
        endYear: 2022,
        current: false,
      },
    ],
    certifications: [
      {
        name: "React Developer Certification",
        issuer: "Frontend Masters",
        date: "February 2025",
        expires: "February 2028",
        credentialLink: "#",
      },
      {
        name: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "November 2024",
        credentialLink: "#",
      },
    ],
    achievements: [
      { title: "Dean's List", year: "2024" },
      { title: "Hackathon Winner", year: "2023" },
      { title: "Top Performer - Data Structures", year: "2023" },
    ],
  };

  return (
    <RouterGuard allowedRoles={["student"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-3xl font-bold">Student Profile</h1>
            <Button variant="outline" className="mt-4 sm:mt-0">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Overview */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center pb-2">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
                  <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{studentProfile.name}</CardTitle>
                <CardDescription>{studentProfile.department}</CardDescription>
                <div className="flex justify-center mt-2 space-x-1">
                  <Badge>{studentProfile.year}</Badge>
                  <Badge variant="outline">GPA: {studentProfile.gpa}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {studentProfile.email}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {studentProfile.contactInfo.phone}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {studentProfile.contactInfo.address}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Enrollment: {studentProfile.enrollmentNumber}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center space-x-2 pt-2">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="skills" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="skills" className="space-y-4">
                  {studentProfile.skills.map((skill, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">{skill.level}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                      </div>
                      <div className="skill-progress-bar">
                        <div 
                          className="skill-progress-fill" 
                          style={{ 
                            width: `${skill.progress}%`, 
                            backgroundColor: skill.progress > 80 
                              ? '#10b981' 
                              : skill.progress > 60 
                              ? '#0d9488' 
                              : '#f59e0b'
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">Add New Skill</Button>
                </TabsContent>
                
                <TabsContent value="education">
                  {studentProfile.education.map((education, index) => (
                    <Card key={index} className="mb-4">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{education.degree}</CardTitle>
                            <CardDescription>{education.field}</CardDescription>
                          </div>
                          {education.current && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              Current
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center mb-1">
                          <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{education.institution}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {education.startYear} - {education.current ? "Present" : education.endYear}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full">Add Education</Button>
                </TabsContent>
                
                <TabsContent value="certifications">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentProfile.certifications.map((certification, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{certification.name}</CardTitle>
                          <CardDescription>{certification.issuer}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center mb-1">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Issued: {certification.date}</span>
                          </div>
                          {certification.expires && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">Expires: {certification.expires}</span>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href={certification.credentialLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Credential
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">Add Certification</Button>
                </TabsContent>
                
                <TabsContent value="achievements">
                  <div className="space-y-4">
                    {studentProfile.achievements.map((achievement, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex items-center">
                          <div className="bg-amber-100 rounded-full p-2 mr-4">
                            <Award className="h-6 w-6 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.year}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">Add Achievement</Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </MainLayout>
    </RouterGuard>
  );
};

export default Profile;
