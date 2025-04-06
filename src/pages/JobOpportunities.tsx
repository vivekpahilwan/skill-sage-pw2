import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useJobContext } from "@/contexts/JobContext";
import { useNavigate } from "react-router-dom";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
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
  DollarSign,
  Edit,
  Users,
  Trash2
} from "lucide-react";

const JobOpportunities: React.FC = () => {
  const { role } = useAuth();
  const { jobs, deleteJob } = useJobContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  
  // Filter and sort jobs
  const filteredJobs = jobs
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

  const handleCreateJob = () => {
    navigate("/jobs/create");
  };

  const handleEditJob = (jobId: number) => {
    navigate(`/jobs/edit/${jobId}`);
  };

  const handleViewApplicants = (jobId: number) => {
    navigate(`/jobs/applicants/${jobId}`);
  };

  const handleDeleteJob = (id: number) => {
    deleteJob(id);
    toast.success("Job opportunity deleted successfully");
    setJobToDelete(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          {(role === "placement" || role === "alumni") && (
            <Button 
              className="mt-4 sm:mt-0 bg-skillsage-primary hover:bg-skillsage-primary/90"
              onClick={handleCreateJob}
            >
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
                            <Button variant="outline" onClick={() => handleEditJob(job.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Job Opportunity</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this job opportunity? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteJob(job.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <Button variant="default" onClick={() => handleViewApplicants(job.id)}>
                              <Users className="h-4 w-4 mr-2" />
                              View Applicants
                            </Button>
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
