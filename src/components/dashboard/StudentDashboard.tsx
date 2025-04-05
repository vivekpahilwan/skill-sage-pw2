
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, BriefcaseBusiness, Calendar, Medal, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StudentDashboard: React.FC = () => {
  const skills = [
    { name: "JavaScript", progress: 75 },
    { name: "React", progress: 65 },
    { name: "Node.js", progress: 50 },
    { name: "Python", progress: 80 },
    { name: "SQL", progress: 60 },
  ];

  const upcomingQuizzes = [
    { id: 1, title: "Web Development Fundamentals", date: "Apr 10, 2025", subject: "Web Dev" },
    { id: 2, title: "Data Structures Basics", date: "Apr 15, 2025", subject: "DSA" },
  ];

  const recentJobs = [
    { id: 1, title: "Frontend Developer Intern", company: "TechCorp Inc.", location: "Remote" },
    { id: 2, title: "Software Engineer", company: "InnovateX", location: "New York" },
    { id: 3, title: "UX/UI Designer", company: "DesignHub", location: "San Francisco" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Quizzes</CardTitle>
            <Medal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Applied Jobs</CardTitle>
            <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24<span className="text-sm text-muted-foreground">/150</span></div>
            <p className="text-xs text-muted-foreground">
              +5 positions from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Progress */}
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle>Skills Progress</CardTitle>
            <CardDescription>Your current skill levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">View All Skills</Button>
          </CardContent>
        </Card>

        {/* Upcoming Quizzes */}
        <Card className="animate-slide-in" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Upcoming Quizzes</CardTitle>
            <CardDescription>Prepare for these assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingQuizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">{quiz.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {quiz.date}
                    </div>
                  </div>
                  <Badge variant="outline">{quiz.subject}</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">View All Quizzes</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Job Opportunities */}
      <Card className="animate-slide-in" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle>Recent Job Opportunities</CardTitle>
          <CardDescription>Jobs matching your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentJobs.map((job) => (
              <Card key={job.id} className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">{job.title}</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>{job.company}</div>
                      <div>{job.location}</div>
                    </div>
                    <Button size="sm" variant="secondary" className="w-full mt-2">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All Opportunities</Button>
        </CardContent>
      </Card>
    </div>
  );
};
