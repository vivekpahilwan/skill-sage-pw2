import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm from "@/components/job/JobForm";
import { toast } from "sonner";

// Mock job opportunities data (same as in JobOpportunities.tsx)
const jobOpportunities = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "Remote",
    type: "Internship",
    description: "Exciting opportunity for a passionate frontend developer to join our team. You'll be working on cutting-edge web applications using React and TypeScript.",
    requirements: ["React", "TypeScript", "CSS", "Git"],
    salary: "$20-25/hour",
    deadline: "Apr 30, 2025",
    postedDate: "Apr 1, 2025",
    logo: "https://i.pravatar.cc/150?img=50",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "InnovateX",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our engineering team to build scalable and robust backend services. You'll work with a diverse team of engineers on challenging technical problems.",
    requirements: ["Java", "Spring Boot", "AWS", "Microservices"],
    salary: "$95,000-120,000/year",
    deadline: "May 15, 2025",
    postedDate: "Apr 2, 2025",
    logo: "https://i.pravatar.cc/150?img=51",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "DataInsights",
    location: "Boston, MA",
    type: "Full-time",
    description: "Looking for a data analyst to join our growing team. You'll help extract meaningful insights from large datasets and present findings to stakeholders.",
    requirements: ["SQL", "Python", "Data Visualization", "Statistics"],
    salary: "$80,000-95,000/year",
    deadline: "May 10, 2025",
    postedDate: "Apr 3, 2025",
    logo: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 4,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    description: "Seeking a creative UX/UI designer to help design intuitive and beautiful user interfaces for our products. You'll work closely with product managers and developers.",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    salary: "$40-50/hour",
    deadline: "Apr 25, 2025",
    postedDate: "Apr 3, 2025",
    logo: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Join our DevOps team to build and maintain our cloud infrastructure. You'll work on automating deployment processes and ensuring system reliability.",
    requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    salary: "$110,000-130,000/year",
    deadline: "May 20, 2025",
    postedDate: "Apr 5, 2025",
    logo: "https://i.pravatar.cc/150?img=54",
  },
];

const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch job details
    const jobId = parseInt(id || "0");
    const foundJob = jobOpportunities.find(j => j.id === jobId);
    
    if (foundJob) {
      setJob(foundJob);
    } else {
      toast.error("Job not found");
      navigate("/jobs");
    }
    
    setIsLoading(false);
  }, [id, navigate]);
  
  const handleUpdateJob = (formData: any) => {
    // In a real app, this would be an API call to update the job
    console.log("Updating job with data:", formData);
    
    // Mock successful update
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
