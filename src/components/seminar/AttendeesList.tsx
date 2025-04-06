
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileDown } from "lucide-react";

// Mock attendees data
const mockAttendees = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex.m@example.com",
    department: "Computer Science",
    year: "3rd Year",
    confirmed: true,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.s@example.com",
    department: "Electronics",
    year: "4th Year",
    confirmed: true,
    avatar: "https://i.pravatar.cc/150?img=31"
  },
  {
    id: 3,
    name: "Tom Wilson",
    email: "tom.w@example.com",
    department: "Computer Science",
    year: "2nd Year",
    confirmed: false,
    avatar: "https://i.pravatar.cc/150?img=19"
  },
  {
    id: 4,
    name: "Jennifer Lopez",
    email: "jennifer.l@example.com",
    department: "Data Science",
    year: "4th Year",
    confirmed: true,
    avatar: "https://i.pravatar.cc/150?img=26"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.b@example.com",
    department: "Mechanical",
    year: "3rd Year",
    confirmed: false,
    avatar: "https://i.pravatar.cc/150?img=13"
  }
];

interface AttendeesListProps {
  seminarId: number;
  seminarTitle: string;
}

const AttendeesList: React.FC<AttendeesListProps> = ({ seminarId, seminarTitle }) => {
  // Get attendees based on seminar ID (in a real app, this would fetch from an API)
  const attendees = mockAttendees;
  
  const exportAttendeesCSV = () => {
    // Generate CSV content
    const headers = ["Name", "Email", "Department", "Year", "Confirmed"];
    const csvContent = [
      headers.join(","),
      ...attendees.map(att => 
        [att.name, att.email, att.department, att.year, att.confirmed ? "Yes" : "No"].join(",")
      )
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `attendees-${seminarTitle.replace(/\s+/g, '-').toLowerCase()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Attendees for {seminarTitle}</CardTitle>
          <CardDescription>Total of {attendees.length} registered attendees</CardDescription>
        </div>
        <Button variant="outline" onClick={exportAttendeesCSV}>
          <FileDown className="mr-2 h-4 w-4" />
          Export List
        </Button>
      </CardHeader>
      <CardContent>
        {attendees.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={attendee.avatar} alt={attendee.name} />
                        <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{attendee.name}</div>
                        <div className="text-sm text-muted-foreground">{attendee.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{attendee.department}</TableCell>
                  <TableCell>{attendee.year}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={attendee.confirmed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {attendee.confirmed ? "Confirmed" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Send Reminder</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No attendees have registered for this seminar yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendeesList;
