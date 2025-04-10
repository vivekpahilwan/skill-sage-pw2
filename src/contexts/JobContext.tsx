
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  deadline: string;
  posted_date: string;
  posted_by: string;
  logo: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface JobContextType {
  jobs: JobOpportunity[];
  addJob: (job: Omit<JobOpportunity, "id" | "posted_date" | "logo" | "is_active" | "posted_by" | "created_at" | "updated_at">) => Promise<void>;
  updateJob: (job: JobOpportunity) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  getJob: (id: string) => Promise<JobOpportunity | undefined>;
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setJobs(data as JobOpportunity[]);
      }
    } catch (error: any) {
      console.error("Error fetching jobs:", error);
      setError(error.message || "Failed to fetch job opportunities");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async (job: Omit<JobOpportunity, "id" | "posted_date" | "logo" | "is_active" | "posted_by" | "created_at" | "updated_at">) => {
    try {
      setIsLoading(true);
      
      if (!user) {
        throw new Error("You must be logged in to add a job");
      }
      
      const newJob = {
        ...job,
        posted_date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        logo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 50}`,
        is_active: true,
        posted_by: user.id
      };

      const { data, error } = await supabase
        .from('opportunities')
        .insert([newJob])
        .select();

      if (error) throw error;

      if (data) {
        setJobs(prevJobs => [...prevJobs, data[0] as JobOpportunity]);
        toast.success("Job added successfully");
      }
    } catch (error: any) {
      console.error("Error adding job:", error);
      toast.error(error.message || "Failed to add job");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJob = async (updatedJob: JobOpportunity) => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('opportunities')
        .update(updatedJob)
        .eq('id', updatedJob.id)
        .select();

      if (error) throw error;

      if (data) {
        setJobs(prevJobs => 
          prevJobs.map(job => job.id === updatedJob.id ? data[0] as JobOpportunity : job)
        );
        toast.success("Job updated successfully");
      }
    } catch (error: any) {
      console.error("Error updating job:", error);
      toast.error(error.message || "Failed to update job");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      setIsLoading(true);

      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (error: any) {
      console.error("Error deleting job:", error);
      toast.error(error.message || "Failed to delete job");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getJob = async (id: string): Promise<JobOpportunity | undefined> => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      return data as JobOpportunity;
    } catch (error: any) {
      console.error("Error fetching job:", error);
      toast.error(error.message || "Failed to fetch job");
      return undefined;
    }
  };

  return (
    <JobContext.Provider value={{ 
      jobs, 
      addJob, 
      updateJob, 
      deleteJob, 
      getJob,
      fetchJobs,
      isLoading, 
      error 
    }}>
      {children}
    </JobContext.Provider>
  );
};
