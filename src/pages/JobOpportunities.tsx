
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { BriefcaseBusiness, Calendar, CircleDollarSign, Clock, MapPin, Plus, Search, Trash2 } from "lucide-react";
import { useSupabase } from "@/hooks/useSupabase";
import { Opportunity } from "@/services/supabase";
import { supabase } from "@/integrations/supabase/client";

const JobOpportunities: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  
  const { data: jobs, isLoading, error, fetchData, execute } = useSupabase<Opportunity[]>([], true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    await fetchData(async () => {
      const filters: Record<string, any> = {};
      
      if (activeTab === "posted" && user) {
        filters.posted_by = user.id;
      }
      
      if (locationFilter) {
        filters.location = locationFilter;
      }
      
      if (typeFilter) {
        filters.type = typeFilter;
      }
      
      return await execute(() => {
        // Fix: instead of using user?.service which doesn't exist, use the imported supabase client or service functions
        let query = supabase
          .from('opportunities')
          .select('*')
          .eq('is_active', true);
          
        if (filters.posted_by) {
          query = query.eq('posted_by', filters.posted_by);
        }
        
        if (filters.location) {
          query = query.eq('location', filters.location);
        }
        
        if (filters.type) {
          query = query.eq('type', filters.type);
        }
        
        return query.order('posted_date', { ascending: false });
      });
    }, {
      loadingMessage: "Fetching job opportunities...",
      errorMessage: "Failed to fetch job opportunities",
    });
  };

  useEffect(() => {
    fetchJobs();
  }, [activeTab, locationFilter, typeFilter]);

  const handleCreateJob = () => {
    navigate("/jobs/create");
  };

  const handleDeleteJob = async (jobId: string) => {
    await execute(async () => {
      // Fix: instead of using user?.service which doesn't exist, use the imported supabase client
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', jobId);
        
      if (error) throw error;
      
      fetchJobs();
    }, {
      loadingMessage: "Deleting job opportunity...",
      successMessage: "Job opportunity deleted successfully",
      errorMessage: "Failed to delete job opportunity",
      showSuccessToast: true,
    });
  };

  const filteredJobs = jobs?.filter((job) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term)
    );
  });

  const locations = [...new Set(jobs?.map((job) => job.location))];
  const types = [...new Set(jobs?.map((job) => job.type))];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Job Opportunities</h1>
            <p className="text-muted-foreground">
              Explore career opportunities and find your next role
            </p>
          </div>
          {(role === "placement" || role === "alumni") && (
            <Button onClick={handleCreateJob}>
              <Plus className="mr-2 h-4 w-4" /> Post Job
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            {(role === "placement" || role === "alumni") && (
              <TabsTrigger value="posted">Posted by Me</TabsTrigger>
            )}
            {role === "student" && (
              <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
            )}
          </TabsList>

          <div className="my-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs by title, company, or keywords..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Location</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="all" className="mt-6">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <p>Loading job opportunities...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center p-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : filteredJobs && filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    canDelete={role === "placement" || (role === "alumni" && job.posted_by === user?.id)}
                    onDelete={handleDeleteJob}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center p-8 text-muted-foreground">
                <p>No job opportunities found. Try adjusting your filters.</p>
              </div>
            )}
          </TabsContent>

          {(role === "placement" || role === "alumni") && (
            <TabsContent value="posted" className="mt-6">
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <p>Loading your posted jobs...</p>
                </div>
              ) : error ? (
                <div className="flex justify-center p-8 text-red-500">
                  <p>{error}</p>
                </div>
              ) : filteredJobs && filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      canDelete={true}
                      onDelete={handleDeleteJob}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col p-8 text-muted-foreground">
                  <p>You haven't posted any job opportunities yet.</p>
                  <Button onClick={handleCreateJob} className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Post Your First Job
                  </Button>
                </div>
              )}
            </TabsContent>
          )}

          {role === "student" && (
            <TabsContent value="applied" className="mt-6">
              <div className="flex justify-center p-8 text-muted-foreground">
                <p>Applied jobs will be shown here once you've applied to positions.</p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

interface JobCardProps {
  job: Opportunity;
  canDelete: boolean;
  onDelete: (id: string) => Promise<void>;
}

const JobCard: React.FC<JobCardProps> = ({ job, canDelete, onDelete }) => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { toast } = useToast();

  const handleViewDetails = () => {
    toast({
      description: `Viewing details for ${job.title}`,
    });
  };

  const handleApply = () => {
    toast({
      description: `Applying for ${job.title}`,
    });
  };

  const handleEdit = () => {
    navigate(`/jobs/edit/${job.id}`);
  };

  const handleViewApplicants = () => {
    navigate(`/jobs/applicants/${job.id}`);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <Avatar className="h-12 w-12">
            <AvatarImage src={job.logo} alt={job.company} />
            <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
          </Avatar>
          <Badge variant="outline" className="ml-2 h-6">
            {job.type}
          </Badge>
        </div>
        <CardTitle className="text-xl mt-4">{job.title}</CardTitle>
        <CardDescription className="flex items-center">
          <BriefcaseBusiness className="h-4 w-4 mr-1" />
          {job.company}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6 flex-1">
        <div className="space-y-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CircleDollarSign className="h-4 w-4 mr-1" />
            {job.salary}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Apply by: {new Date(job.deadline).toLocaleDateString()}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {job.requirements.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
            {job.requirements.length > 3 && (
              <Badge variant="secondary" className="font-normal">
                +{job.requirements.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex flex-wrap gap-2">
        {role === "student" && (
          <Button className="flex-1" onClick={handleApply}>
            Apply Now
          </Button>
        )}
        
        {(role === "placement" || role === "alumni") && (
          <>
            <Button variant="outline" className="flex-1" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleViewApplicants}>
              Applicants
            </Button>
          </>
        )}
        
        <Button variant="ghost" className="flex-none" onClick={handleViewDetails}>
          Details
        </Button>
        
        {canDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this job opportunity. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(job.id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobOpportunities;
