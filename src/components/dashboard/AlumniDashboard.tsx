
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BriefcaseBusiness, Calendar, HandHelping, Users, Edit, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import SeminarForm from "@/components/seminar/SeminarForm";

export const AlumniDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const stats = [
    { 
      id: 1, 
      title: "Job Postings", 
      value: 8, 
      icon: BriefcaseBusiness, 
      description: "Jobs you've posted" 
    },
    { 
      id: 2, 
      title: "Students Referred", 
      value: 15, 
      icon: Users, 
      description: "Your referrals" 
    },
    { 
      id: 3, 
      title: "Seminars Conducted", 
      value: 3, 
      icon: Calendar, 
      description: "This year" 
    },
  ];
  
  const recentReferrals = [
    { 
      id: 1, 
      name: "Emily Chen", 
      position: "Software Engineer", 
      company: "Google", 
      date: "Mar 15, 2025", 
      status: "Accepted",
      avatar: "https://i.pravatar.cc/150?img=5" 
    },
    { 
      id: 2, 
      name: "David Rodriguez", 
      position: "Product Manager", 
      company: "Microsoft", 
      date: "Feb 28, 2025", 
      status: "In Process",
      avatar: "https://i.pravatar.cc/150?img=8" 
    },
    { 
      id: 3, 
      name: "Sarah Johnson", 
      position: "UX Designer", 
      company: "Amazon", 
      date: "Feb 10, 2025", 
      status: "Rejected",
      avatar: "https://i.pravatar.cc/150?img=9" 
    },
  ];
  
  const upcomingSeminars = [
    { 
      id: 1, 
      title: "Machine Learning in Industry", 
      date: "Apr 15, 2025", 
      time: "3:00 PM - 5:00 PM", 
      location: "Virtual", 
      attendees: 35 
    },
    { 
      id: 2, 
      title: "Career Pathways in Tech", 
      date: "Apr 28, 2025", 
      time: "2:00 PM - 4:00 PM", 
      location: "Campus Auditorium", 
      attendees: 80 
    },
  ];

  const handlePostJob = () => {
    navigate("/jobs/create");
  };

  const handleEditSeminar = (seminarId: number) => {
    navigate(`/seminars/edit/${seminarId}`);
  };

  const handleViewAttendees = (seminarId: number) => {
    navigate(`/seminars/attendees/${seminarId}`);
  };

  const handleSeminarSubmit = (formData: any) => {
    console.log("New seminar data:", formData);
    toast.success("Seminar request submitted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold">Alumni Dashboard</h1>
        <div className="mt-4 sm:mt-0 space-x-2">
          <Button 
            className="bg-skillsage-primary hover:bg-skillsage-primary/90"
            onClick={handlePostJob}
          >
            Post Job Opportunity
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                Request Seminar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Request a New Seminar</DialogTitle>
                <DialogDescription>
                  Fill out the details for your proposed seminar.
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-y-auto py-4">
                <SeminarForm 
                  mode="create"
                  onSubmit={handleSeminarSubmit}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="animate-slide-in" style={{ animationDelay: `${stat.id * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Referrals */}
        <Card className="animate-slide-in" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
            <CardDescription>Students you've recently referred</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReferrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={referral.avatar} alt={referral.name} />
                      <AvatarFallback>{referral.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{referral.name}</h4>
                      <div className="text-sm text-muted-foreground">{referral.position} at {referral.company}</div>
                      <div className="text-xs text-muted-foreground">Referred on: {referral.date}</div>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      referral.status === "Accepted" ? "default" : 
                      referral.status === "In Process" ? "outline" : 
                      "secondary"
                    }
                    className={
                      referral.status === "Accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                      referral.status === "Rejected" ? "bg-red-100 text-red-800 hover:bg-red-100" : 
                      ""
                    }
                  >
                    {referral.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/refer')}>View All Referrals</Button>
          </CardContent>
        </Card>

        {/* Upcoming Seminars */}
        <Card className="animate-slide-in" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle>Upcoming Seminars</CardTitle>
            <CardDescription>Seminars you're scheduled to conduct</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSeminars.map((seminar) => (
                <div key={seminar.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{seminar.title}</h4>
                    <Badge variant="outline">{seminar.attendees} attendees</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {seminar.date}, {seminar.time}
                    </div>
                    <div>{seminar.location}</div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditSeminar(seminar.id)}>
                      <Edit className="mr-1 h-3 w-3" />
                      Edit Details
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleViewAttendees(seminar.id)}>
                      <Eye className="mr-1 h-3 w-3" />
                      View Attendees
                    </Button>
                  </div>
                </div>
              ))}
              {upcomingSeminars.length === 0 && (
                <div className="text-center p-8">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No Upcoming Seminars</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Schedule a seminar to share your industry expertise with students
                  </p>
                  <Button className="mt-4" onClick={() => navigate('/seminars/create')}>Request New Seminar</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
