
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SkillsAssessment from "./pages/SkillsAssessment";
import JobOpportunities from "./pages/JobOpportunities";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import { RouterGuard } from "./components/RouterGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <RouterGuard>
                <Dashboard />
              </RouterGuard>
            } />
            <Route path="/profile" element={
              <RouterGuard allowedRoles={["student", "alumni"]}>
                <Profile />
              </RouterGuard>
            } />
            <Route path="/skills" element={
              <RouterGuard allowedRoles={["student"]}>
                <SkillsAssessment />
              </RouterGuard>
            } />
            <Route path="/jobs" element={
              <RouterGuard>
                <JobOpportunities />
              </RouterGuard>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
