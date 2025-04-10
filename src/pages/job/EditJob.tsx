
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm from "@/components/job/JobForm";
import { toast } from "sonner";
import { useJobContext, JobOpportunity } from "@/contexts/JobContext";

const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob, updateJob } = useJobContext();
  const [job, setJob] = useState<JobOpportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        toast.error("Job ID is missing");
        navigate("/jobs");
        return;
      }
      
      const foundJob = await getJob(id);
      
      if (foundJob) {
        setJob(foundJob);
      } else {
        toast.error("Job not found");
        navigate("/jobs");
      }
      
      setIsLoading(false);
    };
    
    fetchJob();
  }, [id, navigate, getJob]);
  
  const handleUpdateJob = (formData: any) => {
    if (!job) return;
    
    // Preserve the original fields that shouldn't be changed
    const updatedJob = { 
      ...formData,
      id: job.id,
      posted_date: job.posted_date,
      logo: job.logo,
      posted_by: job.posted_by,
      is_active: job.is_active
    };
    
    updateJob(updatedJob);
    toast.success("Job opportunity updated successfully");
    navigate("/jobs");
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading job details...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!job) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Job not found</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Edit Job Opportunity</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Edit Job Details</CardTitle>
            <CardDescription>
              Update the job opportunity information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobForm 
              mode="edit" 
              initialData={job}
              onSubmit={handleUpdateJob} 
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditJob;
