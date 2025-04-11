
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type UserRole = 'student' | 'placement' | 'alumni';

export interface UserData {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: UserRole;
}

interface AuthContextType {
  user: UserData | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          // First check if the user exists in our users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle(); // Changed from single() to maybeSingle() to avoid the error
            
          if (userError) {
            console.error("Error fetching user data:", userError);
            throw userError;
          }
          
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.full_name,
              role: userData.role as UserRole,
              avatar: `https://ui-avatars.com/api/?name=${userData.full_name.replace(' ', '+')}&background=random`,
            });
            
            setRole(userData.role as UserRole);
          } else {
            // User not found in our users table, log them out
            console.warn("User found in auth but not in users table. Logging out.");
            await supabase.auth.signOut();
            setUser(null);
            setRole(null);
          }
        }
      } catch (err: any) {
        console.error("Error checking session:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle(); // Changed from single() to maybeSingle()
            
          if (!userError && userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.full_name,
              role: userData.role as UserRole,
              avatar: `https://ui-avatars.com/api/?name=${userData.full_name.replace(' ', '+')}&background=random`,
            });
            
            setRole(userData.role as UserRole);
          } else {
            // User not found in our users table
            console.warn("User found in auth but not in users table during state change.");
            setUser(null);
            setRole(null);
          }
        } else {
          setUser(null);
          setRole(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signup = async (email: string, password: string, fullName: string, selectedRole: UserRole): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Signing up with role:", selectedRole);
      
      // Register with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: selectedRole
          }
        }
      });
      
      if (error) throw error;
      if (!data.user) throw new Error("Failed to create user account");

      console.log("User created successfully:", data.user.id);
      console.log("Creating user profile with role:", selectedRole);

      // Create user profile with a 2-second timeout for database operations
      const userCreationPromise = new Promise<void>(async (resolve, reject) => {
        try {
          // Create user profile
          const { error: userError } = await supabase
            .from('users')
            .insert([{
              id: data.user!.id,
              email: email,
              full_name: fullName,
              role: selectedRole
            }]);
            
          if (userError) {
            console.error("Error creating user profile:", userError);
            reject(userError);
            return;
          }
          
          console.log("User profile created successfully. Creating role-specific profile for:", selectedRole);
          
          // Create role-specific profile
          if (selectedRole === 'student') {
            console.log("Creating student profile");
            const { error: profileError } = await supabase
              .from('student_profiles')
              .insert([{
                id: data.user!.id,
                prn: '',
                department: '',
                year: 1,
                cgpa: 0,
                phone: '',
                skills: [],
                address: ''
              }]);
              
            if (profileError) {
              console.error("Error creating student profile:", profileError);
              reject(profileError);
              return;
            }
          } else if (selectedRole === 'placement') {
            console.log("Creating placement officer profile");
            const { error: profileError } = await supabase
              .from('tpo_profiles')
              .insert([{
                id: data.user!.id,
                department: '',
                position: '',
                phone: ''
              }]);
              
            if (profileError) {
              console.error("Error creating placement profile:", profileError);
              reject(profileError);
              return;
            }
          } else if (selectedRole === 'alumni') {
            console.log("Creating alumni profile");
            const { error: profileError } = await supabase
              .from('alumni_profiles')
              .insert([{
                id: data.user!.id,
                graduation_year: new Date().getFullYear(),
                company: '',
                position: '',
                experience_years: 0,
                phone: '',
                industry: '',
                linkedin: ''
              }]);
              
            if (profileError) {
              console.error("Error creating alumni profile:", profileError);
              reject(profileError);
              return;
            }
          }
          
          console.log("Role-specific profile created successfully");
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      
      // Set a timeout to prevent hanging if database operations take too long
      const timeoutPromise = new Promise<void>((_, reject) => {
        setTimeout(() => {
          reject(new Error("Database operation timed out. Your account may have been created, but please try logging in."));
        }, 8000);
      });
      
      // Use Promise.race to either complete the operation or timeout
      await Promise.race([userCreationPromise, timeoutPromise]);
      
      toast.success("Account created successfully! Please log in.");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      console.log("User logged in successfully, fetching user data");
      
      // Get user data from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle(); // Changed from single() to maybeSingle()
        
      if (userError) {
        console.error("Error fetching user data:", userError);
        throw userError;
      }
      
      if (!userData) {
        throw new Error("User profile not found. Please contact support.");
      }
      
      console.log("User data fetched:", userData);
      
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.full_name,
        role: userData.role as UserRole,
        avatar: `https://ui-avatars.com/api/?name=${userData.full_name.replace(' ', '+')}&background=random`,
      });
      
      setRole(userData.role as UserRole);
      console.log("User role set:", userData.role);
      
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setRole(null);
      
      navigate("/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      login, 
      signup,
      logout, 
      isLoading, 
      error,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
