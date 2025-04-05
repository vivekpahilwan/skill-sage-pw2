
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

// New pages
import StudentDatabase from "./pages/StudentDatabase";
import PlacementAnalytics from "./pages/PlacementAnalytics";
import CourseSuggestion from "./pages/CourseSuggestion";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ReferStudents from "./pages/ReferStudents";

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
            
            {/* Placement Role Routes */}
            <Route path="/students" element={
              <RouterGuard allowedRoles={["placement"]}>
                <StudentDatabase />
              </RouterGuard>
            } />
            <Route path="/analytics" element={
              <RouterGuard allowedRoles={["placement"]}>
                <PlacementAnalytics />
              </RouterGuard>
            } />
            
            {/* Student Role Routes */}
            <Route path="/courses" element={
              <RouterGuard allowedRoles={["student"]}>
                <CourseSuggestion />
              </RouterGuard>
            } />
            <Route path="/resume" element={
              <RouterGuard allowedRoles={["student"]}>
                <ResumeAnalyzer />
              </RouterGuard>
            } />
            
            {/* Alumni Role Routes */}
            <Route path="/refer" element={
              <RouterGuard allowedRoles={["alumni"]}>
                <ReferStudents />
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
