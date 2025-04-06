
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm from "@/components/job/JobForm";
import { toast } from "sonner";
import { useJobContext } from "@/contexts/JobContext";

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { addJob } = useJobContext();
  
  const handleCreateJob = (formData: any) => {
    // Add the new job through context
    addJob(formData);
    
    toast.success("Job opportunity created successfully");
    navigate("/jobs");
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Post New Job Opportunity</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Create a new job opportunity for students. Fill in all the required information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobForm mode="create" onSubmit={handleCreateJob} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateJob;
