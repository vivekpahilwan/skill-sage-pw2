
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SeminarForm from "@/components/seminar/SeminarForm";
import { toast } from "sonner";

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

const EditSeminar: React.FC = () => {
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
      toast.error("Seminar not found");
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  }, [id, navigate]);
  
  const handleUpdateSeminar = (formData: any) => {
    // In a real app, this would be an API call to update the seminar
    console.log("Updating seminar with data:", formData);
    
    // Mock successful update
    toast.success("Seminar updated successfully");
    navigate("/dashboard");
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading seminar details...</p>
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
        <h1 className="text-3xl font-bold">Edit Seminar</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Edit Seminar Details</CardTitle>
            <CardDescription>
              Update the seminar information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SeminarForm 
              mode="edit" 
              initialData={seminar}
              onSubmit={handleUpdateSeminar} 
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditSeminar;
