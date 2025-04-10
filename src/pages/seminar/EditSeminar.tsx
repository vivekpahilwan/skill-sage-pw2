
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SeminarForm from "@/components/seminar/SeminarForm";
import { toast } from "sonner";
import { useSeminarContext } from "@/contexts/SeminarContext";

const EditSeminar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSeminar, updateSeminar } = useSeminarContext();
  const [seminar, setSeminar] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSeminar = async () => {
      if (!id) {
        toast.error("Seminar ID is missing");
        navigate("/dashboard");
        return;
      }
      
      const foundSeminar = await getSeminar(id);
      
      if (foundSeminar) {
        setSeminar(foundSeminar);
      } else {
        toast.error("Seminar not found");
        navigate("/dashboard");
      }
      
      setIsLoading(false);
    };
    
    fetchSeminar();
  }, [id, navigate, getSeminar]);
  
  const handleUpdateSeminar = (formData: any) => {
    // Preserve the original ID and attendees count
    const updatedSeminar = { 
      ...formData,
      id: seminar?.id,
      current_attendees: seminar?.current_attendees
    };
    
    updateSeminar(updatedSeminar);
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
