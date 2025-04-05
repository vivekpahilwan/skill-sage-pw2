
import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowUpDown,
  BookmarkPlus,
  BriefcaseBusiness, 
  Building, 
  Calendar, 
  Clock, 
  Filter, 
  MapPin, 
  Plus, 
  Search,
  DollarSign
} from "lucide-react";

const JobOpportunities: React.FC = () => {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  
  // Mock job opportunities data
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

  // Filter and sort jobs
  const filteredJobs = jobOpportunities
    .filter(job => {
      // Search term filter
      if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Job type filter
      if (filterType !== "all" && job.type !== filterType) {
        return false;
      }
      
      // Location filter
      if (filterLocation !== "all") {
        if (filterLocation === "Remote" && job.location !== "Remote") {
          return false;
        } else if (filterLocation === "Onsite" && job.location === "Remote") {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      } else if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return 0;
    });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          {(role === "placement" || role === "alumni") && (
            <Button className="mt-4 sm:mt-0 bg-skillsage-primary hover:bg-skillsage-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Post New Opportunity
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Job title or company"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Onsite">Onsite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterLocation("all");
                setSortBy("latest");
              }}>
                Reset Filters
              </Button>
            </CardContent>
          </Card>
          
          {/* Job Listings */}
          <div className="md:col-span-3">
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="animate-slide-in">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                          <div className="bg-muted w-16 h-16 rounded-md flex items-center justify-center overflow-hidden">
                            <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                            <div>
                              <h3 className="text-lg font-medium">{job.title}</h3>
                              <div className="text-muted-foreground">{job.company}</div>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <Badge variant="outline" className="mr-2">{job.type}</Badge>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                <MapPin className="h-3 w-3 mr-1" />
                                {job.location}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="secondary" className="bg-muted">{req}</Badge>
                            ))}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-muted-foreground">
                            <div className="flex items-center mb-2 sm:mb-0">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.salary}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:space-x-4">
                              <div className="flex items-center mb-2 sm:mb-0">
                                <Calendar className="h-4 w-4 mr-1" />
                                Posted: {job.postedDate}
                              </div>
                              <div className="flex items-center text-amber-600">
                                <Clock className="h-4 w-4 mr-1" />
                                Deadline: {job.deadline}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                        {role === "student" && (
                          <>
                            <Button variant="outline">
                              <BookmarkPlus className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button>Apply Now</Button>
                          </>
                        )}
                        
                        {(role === "placement" || role === "alumni") && (
                          <>
                            <Button variant="outline">Edit</Button>
                            <Button variant="default">View Applicants</Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="animate-slide-in">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BriefcaseBusiness className="h-16 w-16 text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    We couldn't find any job opportunities matching your filters. Try adjusting your search criteria or check back later.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setFilterLocation("all");
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobOpportunities;
