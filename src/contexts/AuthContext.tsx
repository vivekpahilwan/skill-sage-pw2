
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "student" | "placement" | "alumni" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Adding the isLoading property
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "student@example.com",
    password: "password",
    role: "student" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "placement@example.com",
    password: "password",
    role: "placement" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "alumni@example.com",
    password: "password",
    role: "alumni" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add isLoading state with initial value true
  
  useEffect(() => {
    // Check if there's a stored user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false); // Set loading to false after checking authentication
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email && u.password === password && u.role === role);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (foundUser) {
          // Remove password from user object before storing
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          toast.success("Login successful");
          resolve();
        } else {
          toast.error("Invalid credentials");
          reject(new Error("Invalid credentials"));
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading, // Include isLoading in the context value
        login,
        logout,
        role: user?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

