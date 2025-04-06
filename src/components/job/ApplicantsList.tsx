
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileDown } from "lucide-react";

// Mock applicants data
const mockApplicants = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    appliedDate: "Apr 2, 2025",
    status: "Shortlisted",
    resume: "/path/to/resume.pdf",
    avatar: "https://i.pravatar.cc/150?img=60"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    appliedDate: "Apr 3, 2025",
    status: "Under review",
    resume: "/path/to/resume.pdf",
    avatar: "https://i.pravatar.cc/150?img=28"
  },
  {
    id: 3,
    name: "Mike Anderson",
    email: "mike.a@example.com",
    appliedDate: "Apr 3, 2025",
    status: "Rejected",
    resume: "/path/to/resume.pdf",
    avatar: "https://i.pravatar.cc/150?img=22"
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily.w@example.com",
    appliedDate: "Apr 4, 2025",
    status: "Interview scheduled",
    resume: "/path/to/resume.pdf",
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 5,
    name: "Robert Lee",
    email: "robert.l@example.com",
    appliedDate: "Apr 5, 2025",
    status: "Under review",
    resume: "/path/to/resume.pdf",
    avatar: "https://i.pravatar.cc/150?img=32"
  }
];

interface ApplicantsListProps {
  jobId: number;
  jobTitle: string;
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ jobId, jobTitle }) => {
  // Get applicants based on job ID (in a real app, this would fetch from an API)
  const applicants = mockApplicants;
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "interview scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };
  
  const exportApplicantsCSV = () => {
    // Generate CSV content
    const headers = ["Name", "Email", "Applied Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...applicants.map(app => 
        [app.name, app.email, app.appliedDate, app.status].join(",")
      )
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `applicants-${jobTitle.replace(/\s+/g, '-').toLowerCase()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Applicants for {jobTitle}</CardTitle>
          <CardDescription>Total of {applicants.length} applicants</CardDescription>
        </div>
        <Button variant="outline" onClick={exportApplicantsCSV}>
          <FileDown className="mr-2 h-4 w-4" />
          Export List
        </Button>
      </CardHeader>
      <CardContent>
        {applicants.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={applicant.avatar} alt={applicant.name} />
                        <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-sm text-muted-foreground">{applicant.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{applicant.appliedDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(applicant.status)}>
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Resume</Button>
                      <Button size="sm">Update Status</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No applicants yet for this position.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicantsList;
