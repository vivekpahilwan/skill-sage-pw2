
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, BriefcaseBusiness } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole as UserRole);
    
    // Set demo credentials based on role
    if (selectedRole === "student") {
      setEmail("student@example.com");
    } else if (selectedRole === "placement") {
      setEmail("placement@example.com");
    } else if (selectedRole === "alumni") {
      setEmail("alumni@example.com");
    }
    setPassword("password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-skillsage-primary to-skillsage-secondary p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full">
              <Award className="h-10 w-10 text-skillsage-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SkillSage</h1>
          <p className="text-skillsage-light/80">Skill Assessment Platform</p>
        </div>

        <Card className="shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-center">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="student" className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger 
                    value="student" 
                    onClick={() => handleRoleSelect("student")}
                    className="flex flex-col py-2 px-1 h-auto"
                  >
                    <BookOpen className="h-5 w-5 mb-1" />
                    <span className="text-xs">Student</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="placement" 
                    onClick={() => handleRoleSelect("placement")}
                    className="flex flex-col py-2 px-1 h-auto"
                  >
                    <BriefcaseBusiness className="h-5 w-5 mb-1" />
                    <span className="text-xs">Placement</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="alumni" 
                    onClick={() => handleRoleSelect("alumni")}
                    className="flex flex-col py-2 px-1 h-auto"
                  >
                    <Award className="h-5 w-5 mb-1" />
                    <span className="text-xs">Alumni</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="student" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input 
                      id="student-email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input 
                      id="student-password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      required 
                    />
                  </div>
                </TabsContent>

                <TabsContent value="placement" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="placement-email">Email</Label>
                    <Input 
                      id="placement-email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="placement@example.com" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="placement-password">Password</Label>
                    <Input 
                      id="placement-password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      required 
                    />
                  </div>
                </TabsContent>

                <TabsContent value="alumni" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="alumni-email">Email</Label>
                    <Input 
                      id="alumni-email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="alumni@example.com" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alumni-password">Password</Label>
                    <Input 
                      id="alumni-password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      required 
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <Button 
                type="submit" 
                className="w-full bg-skillsage-primary hover:bg-skillsage-primary/90" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              For demo, please use the provided credentials.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
