
import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";
import { RouterGuard } from "@/components/RouterGuard";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem 
} from "@/components/ui/dropdown-menu";

// Sample student data
const studentsData = [
  { 
    id: "1", 
    name: "Aisha Patel", 
    email: "aisha.patel@example.com", 
    department: "Computer Science", 
    year: "4th",
    cgpa: 8.7,
    placementStatus: "Placed",
    company: "Google"
  },
  { 
    id: "2", 
    name: "Raj Sharma", 
    email: "raj.sharma@example.com", 
    department: "Electronics", 
    year: "4th",
    cgpa: 8.2,
    placementStatus: "Placed",
    company: "Microsoft"
  },
  { 
    id: "3", 
    name: "Priya Verma", 
    email: "priya.verma@example.com", 
    department: "Computer Science", 
    year: "4th",
    cgpa: 9.1,
    placementStatus: "Placed",
    company: "Amazon"
  },
  { 
    id: "4", 
    name: "Vikram Singh", 
    email: "vikram.singh@example.com", 
    department: "Mechanical", 
    year: "4th",
    cgpa: 7.8,
    placementStatus: "Not Placed",
    company: "-"
  },
  { 
    id: "5", 
    name: "Neha Gupta", 
    email: "neha.gupta@example.com", 
    department: "Civil", 
    year: "4th",
    cgpa: 8.5,
    placementStatus: "Interview Scheduled",
    company: "Infosys"
  },
  { 
    id: "6", 
    name: "Aryan Kumar", 
    email: "aryan.kumar@example.com", 
    department: "Electrical", 
    year: "4th",
    cgpa: 7.9,
    placementStatus: "Not Placed",
    company: "-"
  },
  { 
    id: "7", 
    name: "Sneha Reddy", 
    email: "sneha.reddy@example.com", 
    department: "Computer Science", 
    year: "3rd",
    cgpa: 9.3,
    placementStatus: "Not Eligible",
    company: "-"
  },
  { 
    id: "8", 
    name: "Rahul Kapoor", 
    email: "rahul.kapoor@example.com", 
    department: "Electronics", 
    year: "4th",
    cgpa: 8.0,
    placementStatus: "Offer Received",
    company: "TCS"
  },
  { 
    id: "9", 
    name: "Ananya Joshi", 
    email: "ananya.joshi@example.com", 
    department: "Computer Science", 
    year: "4th",
    cgpa: 8.9,
    placementStatus: "Placed",
    company: "IBM"
  },
  { 
    id: "10", 
    name: "Karan Malhotra", 
    email: "karan.malhotra@example.com", 
    department: "Mechanical", 
    year: "4th",
    cgpa: 7.6,
    placementStatus: "Offer Received",
    company: "L&T"
  }
];

const StudentDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const departments = Array.from(new Set(studentsData.map(student => student.department)));
  const years = Array.from(new Set(studentsData.map(student => student.year)));
  const statuses = Array.from(new Set(studentsData.map(student => student.placementStatus)));

  const filteredStudents = studentsData.filter(student => {
    // Search filter
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Department filter
    const matchesDepartment = selectedDepartments.length === 0 || 
                              selectedDepartments.includes(student.department);
    
    // Year filter
    const matchesYear = selectedYears.length === 0 || 
                        selectedYears.includes(student.year);
    
    // Status filter
    const matchesStatus = selectedStatuses.length === 0 || 
                          selectedStatuses.includes(student.placementStatus);
    
    return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Placed":
        return "bg-green-100 text-green-800";
      case "Not Placed":
        return "bg-red-100 text-red-800";
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Offer Received":
        return "bg-purple-100 text-purple-800";
      case "Not Eligible":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <RouterGuard allowedRoles={["placement"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Student Database</h1>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} /> Export Data
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search students by name, email, or company..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter size={16} /> Department
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {departments.map(department => (
                    <DropdownMenuCheckboxItem
                      key={department}
                      checked={selectedDepartments.includes(department)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDepartments([...selectedDepartments, department]);
                        } else {
                          setSelectedDepartments(selectedDepartments.filter(d => d !== department));
                        }
                      }}
                    >
                      {department}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter size={16} /> Year
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {years.map(year => (
                    <DropdownMenuCheckboxItem
                      key={year}
                      checked={selectedYears.includes(year)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedYears([...selectedYears, year]);
                        } else {
                          setSelectedYears(selectedYears.filter(y => y !== year));
                        }
                      }}
                    >
                      {year}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter size={16} /> Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {statuses.map(status => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStatuses([...selectedStatuses, status]);
                        } else {
                          setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                        }
                      }}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Company</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.cgpa}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(student.placementStatus)}>
                        {student.placementStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.company}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </MainLayout>
    </RouterGuard>
  );
};

export default StudentDatabase;
