
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Download, MapPin, ArrowLeft } from "lucide-react";
import { useSeminarContext, Seminar } from "@/contexts/SeminarContext";
import { toast } from "sonner";

interface Attendee {
  id: string;
  registered_at: string;
  attended: boolean;
  student: {
    id: string;
    full_name: string;
    email: string;
  };
}

const ViewAttendees: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSeminar, getSeminarAttendees } = useSeminarContext();
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        toast.error("Seminar ID is missing");
        navigate("/dashboard");
        return;
      }
      
      try {
        const seminarData = await getSeminar(id);
        
        if (!seminarData) {
          toast.error("Seminar not found");
          navigate("/dashboard");
          return;
        }
        
        setSeminar(seminarData);
        
        const attendeesData = await getSeminarAttendees(id);
        setAttendees(attendeesData);
      } catch (error) {
        console.error("Error fetching seminar data:", error);
        toast.error("Failed to load seminar data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate, getSeminar, getSeminarAttendees]);
  
  const exportAttendeesList = () => {
    // Generate CSV content
    const headers = ["Name", "Email", "Registration Date", "Attendance Status"];
    const csvContent = [
      headers.join(","),
      ...attendees.map(attendee => 
        [
          attendee.student.full_name,
          attendee.student.email,
          new Date(attendee.registered_at).toLocaleDateString(),
          attendee.attended ? "Attended" : "Not Attended"
        ].join(",")
      )
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `attendees-${seminar?.title.replace(/\s+/g, '-').toLowerCase()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Attendees list exported successfully");
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading attendees...</p>
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
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold">Seminar Attendees</h1>
          
          <Button onClick={exportAttendeesList}>
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{seminar.title}</CardTitle>
                <CardDescription className="flex flex-wrap gap-4 mt-2">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {seminar.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {seminar.time}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {seminar.location}
                  </span>
                </CardDescription>
              </div>
              
              <Badge className="h-8 px-3 text-sm">
                {seminar.current_attendees} Attendees
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {attendees.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attendee</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${attendee.student.full_name.replace(' ', '+')}&background=random`} alt={attendee.student.full_name} />
                            <AvatarFallback>{attendee.student.full_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{attendee.student.full_name}</div>
                            <div className="text-sm text-muted-foreground">{attendee.student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(attendee.registered_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={attendee.attended ? "default" : "secondary"}>
                          {attendee.attended ? "Attended" : "Not Attended"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No students have registered for this seminar yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ViewAttendees;
