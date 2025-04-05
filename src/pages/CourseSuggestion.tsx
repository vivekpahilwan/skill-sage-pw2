
import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Clock, Star, ChevronRight, Bookmark } from "lucide-react";
import { RouterGuard } from "@/components/RouterGuard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample course data
const courseData = [
  {
    id: "1",
    title: "Advanced JavaScript Fundamentals",
    provider: "Udemy",
    duration: "10 hours",
    difficulty: "Intermediate",
    rating: 4.8,
    enrolled: "12.5k",
    match: "98%",
    skills: ["JavaScript", "ES6", "Web Development"],
    description: "Master modern JavaScript concepts and practices with this comprehensive course."
  },
  {
    id: "2",
    title: "React.js: Zero to Hero",
    provider: "Coursera",
    duration: "15 hours",
    difficulty: "Intermediate",
    rating: 4.9,
    enrolled: "24.3k",
    match: "95%",
    skills: ["React", "JavaScript", "Frontend"],
    description: "Learn to build modern, responsive web applications using React.js."
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    provider: "edX",
    duration: "30 hours",
    difficulty: "Advanced",
    rating: 4.7,
    enrolled: "18.9k",
    match: "92%",
    skills: ["DSA", "Problem Solving", "Coding Interviews"],
    description: "Comprehensive guide to data structures and algorithms for technical interviews."
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    provider: "Stanford Online",
    duration: "25 hours",
    difficulty: "Advanced",
    rating: 4.9,
    enrolled: "32.1k",
    match: "90%",
    skills: ["Python", "ML", "Data Science"],
    description: "Introduction to machine learning concepts, algorithms, and practical applications."
  },
  {
    id: "5",
    title: "Full-Stack Web Development",
    provider: "Udacity",
    duration: "40 hours",
    difficulty: "Intermediate",
    rating: 4.6,
    enrolled: "15.7k",
    match: "88%",
    skills: ["HTML/CSS", "JavaScript", "Node.js", "MongoDB"],
    description: "Comprehensive guide to building full-stack web applications from scratch."
  },
  {
    id: "6",
    title: "Cloud Computing with AWS",
    provider: "A Cloud Guru",
    duration: "20 hours",
    difficulty: "Intermediate",
    rating: 4.8,
    enrolled: "9.3k",
    match: "85%",
    skills: ["AWS", "Cloud", "DevOps"],
    description: "Learn to build, deploy and scale applications on Amazon Web Services."
  },
  {
    id: "7",
    title: "UI/UX Design Principles",
    provider: "Interaction Design Foundation",
    duration: "12 hours",
    difficulty: "Beginner",
    rating: 4.5,
    enrolled: "8.2k",
    match: "82%",
    skills: ["UI Design", "UX Research", "Figma"],
    description: "Learn the fundamentals of creating user-centered design experiences."
  },
  {
    id: "8",
    title: "DevOps and CI/CD Pipelines",
    provider: "LinkedIn Learning",
    duration: "18 hours",
    difficulty: "Advanced",
    rating: 4.7,
    enrolled: "6.5k",
    match: "80%",
    skills: ["DevOps", "Docker", "Jenkins", "Git"],
    description: "Master continuous integration and delivery with modern DevOps practices."
  },
  {
    id: "9",
    title: "Mobile App Development with Flutter",
    provider: "Google",
    duration: "22 hours",
    difficulty: "Intermediate",
    rating: 4.8,
    enrolled: "14.2k",
    match: "78%",
    skills: ["Flutter", "Dart", "Mobile Development"],
    description: "Build beautiful, natively compiled applications for mobile from a single codebase."
  },
  {
    id: "10",
    title: "Cybersecurity Fundamentals",
    provider: "edX",
    duration: "16 hours",
    difficulty: "Intermediate",
    rating: 4.6,
    enrolled: "11.8k",
    match: "75%",
    skills: ["Security", "Network Security", "Ethical Hacking"],
    description: "Learn the essentials of securing systems and networks from cyber threats."
  }
];

const popularCategories = [
  { name: "Web Development", icon: BookOpen },
  { name: "Data Science", icon: BookOpen },
  { name: "Mobile Development", icon: BookOpen },
  { name: "Cloud Computing", icon: BookOpen },
  { name: "DevOps", icon: BookOpen },
  { name: "Cybersecurity", icon: BookOpen }
];

const CourseSuggestion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedCourses, setSavedCourses] = useState<string[]>([]);
  
  const filteredCourses = courseData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const toggleSaveCourse = (courseId: string) => {
    if (savedCourses.includes(courseId)) {
      setSavedCourses(savedCourses.filter(id => id !== courseId));
    } else {
      setSavedCourses([...savedCourses, courseId]);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getMatchColor = (match: string) => {
    const percentage = parseInt(match.replace('%', ''));
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <RouterGuard allowedRoles={["student"]}>
      <MainLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Course Suggestions</h1>
          <p className="text-muted-foreground">
            Based on your skills assessment and career goals, we've recommended the following courses to help you grow.
          </p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search for courses, skills, or providers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {popularCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <category.icon className="h-8 w-8 mb-2 text-skillsage-primary" />
                  <p className="text-sm font-medium text-center">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="recommended">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended" className="space-y-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.provider}</p>
                        </div>
                        <div className={`text-lg font-bold ${getMatchColor(course.match)}`}>
                          {course.match} match
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                      
                      <p className="mt-3 text-sm">{course.description}</p>
                      
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          {course.duration}
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          {course.rating} ({course.enrolled} students)
                        </div>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col justify-between p-4 bg-muted/50 md:w-48">
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={() => toggleSaveCourse(course.id)}
                      >
                        <Bookmark className={`h-4 w-4 ${savedCourses.includes(course.id) ? 'fill-current' : ''}`} />
                        {savedCourses.includes(course.id) ? 'Saved' : 'Save'}
                      </Button>
                      <Button className="flex items-center gap-1">
                        View Course <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="bg-muted/50 rounded-lg p-12 text-center">
                <h3 className="text-lg font-medium">Trending Courses</h3>
                <p className="text-muted-foreground mt-2">Browse popular courses among your peers.</p>
                <Button className="mt-4">Explore Trending Courses</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              {savedCourses.length > 0 ? (
                <div className="space-y-4">
                  {courseData
                    .filter(course => savedCourses.includes(course.id))
                    .map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-6 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                <p className="text-sm text-muted-foreground">{course.provider}</p>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex flex-wrap gap-2">
                              {course.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                            
                            <div className="mt-4 flex flex-wrap items-center gap-4">
                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                {course.duration}
                              </div>
                              <div className="flex items-center text-sm">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                {course.rating}
                              </div>
                              <Badge className={getDifficultyColor(course.difficulty)}>
                                {course.difficulty}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex flex-row md:flex-col justify-between p-4 bg-muted/50 md:w-48">
                            <Button 
                              variant="outline" 
                              className="flex items-center gap-1"
                              onClick={() => toggleSaveCourse(course.id)}
                            >
                              <Bookmark className="h-4 w-4 fill-current" />
                              Remove
                            </Button>
                            <Button className="flex items-center gap-1">
                              View Course <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="bg-muted/50 rounded-lg p-12 text-center">
                  <h3 className="text-lg font-medium">No saved courses</h3>
                  <p className="text-muted-foreground mt-2">Courses you save will appear here.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </RouterGuard>
  );
};

export default CourseSuggestion;
