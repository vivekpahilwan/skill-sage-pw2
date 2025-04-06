
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AttendeesList from "@/components/seminar/AttendeesList";

// Mock upcoming seminars data
const upcomingSeminars = [
  { 
    id: 1, 
    title: "Machine Learning in Industry", 
    date: "Apr 15, 2025", 
    time: "15:00", 
    location: "Virtual", 
    attendees: 35,
    description: "An in-depth look at how machine learning is revolutionizing various industries."
  },
  { 
    id: 2, 
    title: "Career Pathways in Tech", 
    date: "Apr 28, 2025", 
    time: "14:00", 
    location: "Campus Auditorium", 
    attendees: 80,
    description: "Guidance on different career paths available in the tech industry and how to prepare for them."
  },
];

const ViewAttendees: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [seminar, setSeminar] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch seminar details
    const seminarId = parseInt(id || "0");
    const foundSeminar = upcomingSeminars.find(s => s.id === seminarId);
    
    if (foundSeminar) {
      setSeminar(foundSeminar);
    } else {
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  }, [id, navigate]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading attendees...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!seminar) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Seminar not found</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">{seminar.title} - Attendees</h1>
        </div>
        
        <AttendeesList seminarId={seminar.id} seminarTitle={seminar.title} />
      </div>
    </MainLayout>
  );
};

export default ViewAttendees;
