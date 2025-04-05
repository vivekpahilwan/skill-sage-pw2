
import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Code, FileQuestion, Award, Brain, Rocket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { RouterGuard } from "@/components/RouterGuard";

const SkillsAssessment: React.FC = () => {
  const [activeTab, setActiveTab] = useState("quizzes");
  
  const quizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics including variables, functions, and objects.",
      questions: 20,
      timeInMinutes: 30,
      category: "Web Development",
      difficulty: "Beginner",
      completed: true,
      score: 85,
    },
    {
      id: 2,
      title: "React Components & Props",
      description: "Assess your understanding of React component architecture and prop management.",
      questions: 15,
      timeInMinutes: 25,
      category: "Web Development",
      difficulty: "Intermediate",
      completed: false,
    },
    {
      id: 3,
      title: "Data Structures Basics",
      description: "Test your knowledge of fundamental data structures like arrays, linked lists, and trees.",
      questions: 25,
      timeInMinutes: 40,
      category: "Computer Science",
      difficulty: "Intermediate",
      completed: true,
      score: 72,
    },
    {
      id: 4,
      title: "SQL Database Queries",
      description: "Demonstrate your SQL query writing and database management skills.",
      questions: 18,
      timeInMinutes: 30,
      category: "Databases",
      difficulty: "Advanced",
      completed: false,
    },
  ];

  const skills = [
    { name: "JavaScript", level: "Intermediate", progress: 75, quizzesTaken: 3, certifications: 1 },
    { name: "React", level: "Beginner", progress: 45, quizzesTaken: 1, certifications: 0 },
    { name: "Node.js", level: "Beginner", progress: 30, quizzesTaken: 1, certifications: 0 },
    { name: "Data Structures", level: "Intermediate", progress: 65, quizzesTaken: 2, certifications: 1 },
    { name: "SQL", level: "Advanced", progress: 85, quizzesTaken: 3, certifications: 2 },
  ];

  const achievements = [
    { id: 1, title: "JavaScript Master", description: "Completed all JavaScript quizzes with >80% score", icon: Code, earned: true },
    { id: 2, title: "Quiz Champion", description: "Complete 10 quizzes with perfect scores", icon: Award, earned: false, progress: 3 },
    { id: 3, title: "Consistent Learner", description: "Complete at least one quiz per week for a month", icon: Clock, earned: true },
    { id: 4, title: "Full Stack Developer", description: "Master both frontend and backend technologies", icon: Rocket, earned: false, progress: 2 },
    { id: 5, title: "Problem Solver", description: "Solve 50 algorithm challenges", icon: Brain, earned: false, progress: 28 },
  ];

  return (
    <RouterGuard allowedRoles={["student"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-3xl font-bold">Skills Assessment</h1>
          </div>
          
          <Tabs defaultValue="quizzes" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="skills">My Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quizzes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id} className="animate-slide-in">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{quiz.title}</CardTitle>
                          <CardDescription>{quiz.description}</CardDescription>
                        </div>
                        {quiz.completed && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {quiz.score}%
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">{quiz.category}</Badge>
                        <Badge variant="outline">{quiz.difficulty}</Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {quiz.timeInMinutes} min
                        </Badge>
                        <Badge variant="outline">
                          <FileQuestion className="h-3 w-3 mr-1" />
                          {quiz.questions} questions
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {quiz.completed ? (
                        <>
                          <Badge variant="outline" className="flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                            Completed
                          </Badge>
                          <Button variant="outline">Review Answers</Button>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline">Not attempted</Badge>
                          <Button className="bg-skillsage-primary hover:bg-skillsage-primary/90">Start Quiz</Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="w-full">View All Quizzes</Button>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              {skills.map((skill) => (
                <Card key={skill.name} className="animate-slide-in">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{skill.name}</CardTitle>
                      <Badge variant="outline">{skill.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span>Proficiency</span>
                          <span>{skill.progress}%</span>
                        </div>
                        <div className="skill-progress-bar">
                          <div 
                            className="skill-progress-fill" 
                            style={{ 
                              width: `${skill.progress}%`, 
                              backgroundColor: skill.progress > 80 
                                ? '#10b981' 
                                : skill.progress > 50 
                                ? '#0d9488' 
                                : '#f59e0b'
                            }} 
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Quizzes Taken: {skill.quizzesTaken}</span>
                        <span className="text-muted-foreground">Certifications: {skill.certifications}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Improve This Skill</Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`animate-slide-in ${achievement.earned ? 'border-green-200' : 'opacity-70'}`}
                  >
                    <CardHeader className="pb-2 text-center">
                      <div className={`mx-auto p-3 rounded-full ${
                        achievement.earned ? 'bg-green-100' : 'bg-muted'
                      }`}>
                        <achievement.icon className={`h-8 w-8 ${
                          achievement.earned ? 'text-green-600' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <CardTitle className="mt-2">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      {achievement.earned ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Earned
                        </Badge>
                      ) : (
                        <>
                          {achievement.progress && (
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">
                                Progress: {achievement.progress} / 
                                {achievement.id === 2 ? '10' : achievement.id === 4 ? '4' : '50'}
                              </div>
                              <Progress 
                                value={achievement.id === 2 
                                  ? (achievement.progress / 10) * 100 
                                  : achievement.id === 4 
                                    ? (achievement.progress / 4) * 100 
                                    : (achievement.progress / 50) * 100
                                } 
                              />
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </RouterGuard>
  );
};

export default SkillsAssessment;
