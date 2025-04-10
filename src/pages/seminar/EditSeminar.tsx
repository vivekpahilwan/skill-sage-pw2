
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SeminarForm from "@/components/seminar/SeminarForm";
import { toast } from "sonner";
import { useSeminarContext } from "@/contexts/SeminarContext";
import { Seminar } from "@/contexts/SeminarContext";

const EditSeminar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSeminar, updateSeminar } = useSeminarContext();
  const [seminar, setSeminar] = useState<Seminar | null>(null);
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
    if (!seminar) return;
    
    // Extract date and time parts if needed
    // The SeminarForm expects separate date and time fields but Seminar has a single date field
    let dateOnly = seminar.date;
    let timeOnly = "12:00"; // Default time if not available in the original data
    
    // Check if formData contains separate date and time fields
    const hasDateTimeFields = formData.date && formData.time;
    
    // Preserve the original ID and attendees count
    const updatedSeminar = { 
      ...formData,
      // If formData has date and time fields, merge them for database storage
      date: hasDateTimeFields ? `${formData.date} ${formData.time}` : formData.date,
      id: seminar.id,
      current_attendees: seminar.current_attendees,
      requested_by: seminar.requested_by,
      is_approved: seminar.is_approved
    };
    
    // Remove the time field as it's not needed in the database model
    if (updatedSeminar.time) {
      delete updatedSeminar.time;
    }
    
    // Rename maxAttendees to max_attendees if needed
    if (updatedSeminar.maxAttendees) {
      updatedSeminar.max_attendees = updatedSeminar.maxAttendees;
      delete updatedSeminar.maxAttendees;
    }
    
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
  
  // Prepare seminar data for the form
  // The SeminarForm expects the time to be a separate field
  const formInitialData = {
    id: seminar.id,
    title: seminar.title,
    date: seminar.date.split(' ')[0] || seminar.date, // Extract date part if possible
    time: seminar.date.split(' ')[1] || "12:00", // Extract time part if possible, or use default
    location: seminar.location,
    description: seminar.description,
    maxAttendees: seminar.max_attendees
  };
  
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
              initialData={formInitialData}
              onSubmit={handleUpdateSeminar} 
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditSeminar;
