
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as supabaseService from "@/services/supabase";

export interface UserData {
  id: string;
  email: string;
  name: string;
  service: typeof supabaseService;
}

interface AuthContextType {
  user: UserData | null;
  role: 'student' | 'placement' | 'alumni' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
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
  const [role, setRole] = useState<'student' | 'placement' | 'alumni' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would check for a Supabase session
        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("role");
        
        if (storedUser && storedRole) {
          const userData = JSON.parse(storedUser);
          setUser({
            ...userData,
            service: supabaseService
          });
          setRole(storedRole as 'student' | 'placement' | 'alumni');
        }
      } catch (err: any) {
        console.error("Error checking session:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // This is a mock login - will be replaced with Supabase auth
      if (email && password) {
        // Determine role based on email domain (for demo purposes)
        let userRole: 'student' | 'placement' | 'alumni' = 'student';
        
        if (email.includes("placement")) {
          userRole = 'placement';
        } else if (email.includes("alumni")) {
          userRole = 'alumni';
        }
        
        const userData: UserData = {
          id: "user-123",
          email: email,
          name: email.split('@')[0],
          service: supabaseService
        };
        
        setUser(userData);
        setRole(userRole);
        
        // Save to localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("role", userRole);
        
        navigate("/dashboard");
      } else {
        throw new Error("Email and password are required");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Clear user state and local storage
      setUser(null);
      setRole(null);
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      
      navigate("/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
