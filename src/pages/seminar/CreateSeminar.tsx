
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SeminarForm from "@/components/seminar/SeminarForm";
import { toast } from "sonner";

const CreateSeminar: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCreateSeminar = (formData: any) => {
    // In a real app, this would be an API call to create a new seminar
    console.log("Creating seminar with data:", formData);
    
    // Mock successful creation
    toast.success("Seminar scheduled successfully");
    navigate("/dashboard");
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Request New Seminar</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Seminar Details</CardTitle>
            <CardDescription>
              Schedule a new seminar to share your industry expertise with students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SeminarForm mode="create" onSubmit={handleCreateSeminar} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateSeminar;
