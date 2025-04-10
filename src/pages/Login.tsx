
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, error } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const validateLogin = () => {
    const errors: Record<string, string> = {};
    
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
    
    if (!password) errors.password = "Password is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignup = () => {
    const errors: Record<string, string> = {};
    
    if (!fullName) errors.fullName = "Full name is required";
    
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
    
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords don't match";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLogin()) return;
    
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignup()) return;
    
    setIsSubmitting(true);
    try {
      await signup(email, password, fullName, selectedRole);
      
      // Clear form
      setEmail("");
      setPassword("");
      setFullName("");
      setConfirmPassword("");
      setSelectedRole("student");
      
      // Switch to login tab
      document.getElementById("login-tab")?.click();
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">SkillSage</h1>
          <p className="text-gray-500">College Career Portal</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" id="login-tab">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="p-0 h-auto" type="button">
                        Forgot Password?
                      </Button>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={formErrors.password ? "border-red-500" : ""}
                    />
                    {formErrors.password && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {formErrors.password}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Enter your details to create a new account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      placeholder="John Doe" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className={formErrors.fullName ? "border-red-500" : ""}
                    />
                    {formErrors.fullName && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {formErrors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <select 
                      id="role"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    >
                      <option value="student">Student</option>
                      <option value="alumni">Alumni</option>
                      <option value="placement">Placement Officer</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input 
                      id="email-signup" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input 
                      id="password-signup" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={formErrors.password ? "border-red-500" : ""}
                    />
                    {formErrors.password && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {formErrors.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={formErrors.confirmPassword ? "border-red-500" : ""}
                    />
                    {formErrors.confirmPassword && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {formErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
