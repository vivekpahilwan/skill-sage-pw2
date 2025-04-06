
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface JobOpportunity {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  deadline: string;
  postedDate: string;
  logo: string;
}

// Initial job data
const initialJobs = [
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

interface JobContextType {
  jobs: JobOpportunity[];
  addJob: (job: Omit<JobOpportunity, "id" | "postedDate" | "logo">) => void;
  updateJob: (job: JobOpportunity) => void;
  getJob: (id: number) => JobOpportunity | undefined;
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
  const [jobs, setJobs] = useState<JobOpportunity[]>(initialJobs);

  const addJob = (job: Omit<JobOpportunity, "id" | "postedDate" | "logo">) => {
    const newJob: JobOpportunity = {
      ...job,
      id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
      postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      logo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 50}`,
    };

    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  const updateJob = (updatedJob: JobOpportunity) => {
    setJobs(prevJobs => 
      prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job)
    );
  };

  const getJob = (id: number) => {
    return jobs.find(job => job.id === id);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, getJob }}>
      {children}
    </JobContext.Provider>
  );
};
