
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
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (userError) throw userError;
          
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.full_name,
              role: userData.role as UserRole,
              avatar: `https://ui-avatars.com/api/?name=${userData.full_name.replace(' ', '+')}&background=random`,
            });
            
            setRole(userData.role as UserRole);
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
            .single();
            
          if (!userError && userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.full_name,
              role: userData.role as UserRole,
              avatar: `https://ui-avatars.com/api/?name=${userData.full_name.replace(' ', '+')}&background=random`,
            });
            
            setRole(userData.role as UserRole);
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
      
      // Create user profile
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: data.user?.id,
          email: email,
          full_name: fullName,
          role: selectedRole
        }]);
        
      if (userError) throw userError;
      
      // Create role-specific profile
      if (selectedRole === 'student') {
        await supabase
          .from('student_profiles')
          .insert([{
            id: data.user?.id,
            prn: '',
            department: '',
            year: 1,
            cgpa: 0,
            phone: '',
            skills: [],
            address: ''
          }]);
      } else if (selectedRole === 'placement') {
        await supabase
          .from('tpo_profiles')
          .insert([{
            id: data.user?.id,
            department: '',
            position: '',
            phone: ''
          }]);
      } else if (selectedRole === 'alumni') {
        await supabase
          .from('alumni_profiles')
          .insert([{
            id: data.user?.id,
            graduation_year: new Date().getFullYear(),
            company: '',
            position: '',
            experience_years: 0,
            phone: '',
            industry: '',
            linkedin: ''
          }]);
      }
      
      toast.success("Account created successfully! Please log in.");
      
      // Remove the return statement that was returning data
      // This makes the function return void as per the interface
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Get user data from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (userError) throw userError;
      
      if (userData) {
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.full_name,
          role: userData.role as UserRole,
          avatar: `https://ui-avatars.com/api/?name=${userData.full_name.replace(' ', '+')}&background=random`,
        });
        
        setRole(userData.role as UserRole);
      }
      
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
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
