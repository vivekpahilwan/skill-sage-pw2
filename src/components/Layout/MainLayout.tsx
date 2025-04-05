
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MenuIcon, XIcon, LogOut, User, BarChart3, BookOpen, BriefcaseBusiness, Users, Award, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
  roles: Array<"student" | "placement" | "alumni">;
}

const navigationItems: NavItem[] = [
  { title: "Dashboard", icon: BarChart3, path: "/dashboard", roles: ["student", "placement", "alumni"] },
  { title: "Profile", icon: User, path: "/profile", roles: ["student", "alumni"] },
  { title: "Skills Assessment", icon: Award, path: "/skills", roles: ["student"] },
  { title: "Job Opportunities", icon: BriefcaseBusiness, path: "/jobs", roles: ["student", "placement", "alumni"] },
  { title: "Course Suggestions", icon: BookOpen, path: "/courses", roles: ["student"] },
  { title: "Resume Analyzer", icon: FileText, path: "/resume", roles: ["student"] },
  { title: "Student Database", icon: Users, path: "/students", roles: ["placement"] },
  { title: "Placement Analytics", icon: BarChart3, path: "/analytics", roles: ["placement"] },
  { title: "Refer Students", icon: Users, path: "/refer", roles: ["alumni"] },
];

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredNavItems = navigationItems.filter(item => user?.role && item.roles.includes(user.role));

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        {/* Mobile header */}
        <header className="lg:hidden bg-skillsage-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
            <h1 className="text-xl font-bold">SkillSage</h1>
          </div>
          {user && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-background z-50 pt-16 animate-fade-in">
            <div className="flex flex-col p-4 space-y-4">
              {filteredNavItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center space-x-3 p-3 hover:bg-muted rounded-md transition-colors"
                >
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </button>
              ))}
              <button
                onClick={logout}
                className="flex items-center space-x-3 p-3 hover:bg-muted text-red-600 rounded-md transition-colors mt-auto"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-1">
          {/* Desktop sidebar */}
          <Sidebar className="hidden lg:flex">
            <SidebarHeader className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <Award className="text-skillsage-secondary h-6 w-6" />
                <h1 className="text-xl font-bold">SkillSage</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <div className="py-4 space-y-1">
                {filteredNavItems.map((item) => (
                  <TooltipProvider key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => navigate(item.path)}
                          className={`w-full flex items-center p-3 space-x-3 hover:bg-sidebar-accent rounded-md transition-colors ${
                            location.pathname === item.path 
                              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                              : "text-sidebar-foreground"
                          }`}
                        >
                          <item.icon size={20} />
                          <span>{item.title}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </SidebarContent>
            <SidebarFooter>
              {user && (
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={logout}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </SidebarFooter>
          </Sidebar>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <div className="hidden lg:block">
              <SidebarTrigger className="p-4">
                <MenuIcon className="h-5 w-5" />
              </SidebarTrigger>
            </div>
            <div className="p-4 md:p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
