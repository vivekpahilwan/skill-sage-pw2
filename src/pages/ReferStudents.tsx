
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
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Download, Mail, Filter, ArrowUpDown } from "lucide-react";
import { RouterGuard } from "@/components/RouterGuard";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem 
} from "@/components/ui/dropdown-menu";

// Sample student data (similar to StudentDatabase but with different fields)
const studentsData = [
  { 
    id: "1", 
    name: "Aisha Patel", 
    email: "aisha.patel@example.com", 
    department: "Computer Science", 
    skills: ["JavaScript", "React", "Node.js"],
    cgpa: 8.7,
    projects: 5,
    competitions: 3
  },
  { 
    id: "2", 
    name: "Raj Sharma", 
    email: "raj.sharma@example.com", 
    department: "Electronics", 
    skills: ["Python", "Circuit Design", "IoT"],
    cgpa: 8.2,
    projects: 4,
    competitions: 2
  },
  { 
    id: "3", 
    name: "Priya Verma", 
    email: "priya.verma@example.com", 
    department: "Computer Science", 
    skills: ["Python", "Machine Learning", "Data Science"],
    cgpa: 9.1,
    projects: 7,
    competitions: 5
  },
  { 
    id: "4", 
    name: "Vikram Singh", 
    email: "vikram.singh@example.com", 
    department: "Mechanical", 
    skills: ["CAD", "Thermodynamics", "AutoCAD"],
    cgpa: 7.8,
    projects: 3,
    competitions: 1
  },
  { 
    id: "5", 
    name: "Neha Gupta", 
    email: "neha.gupta@example.com", 
    department: "Civil", 
    skills: ["AutoCAD", "Structural Analysis", "Project Management"],
    cgpa: 8.5,
    projects: 4,
    competitions: 2
  },
  { 
    id: "6", 
    name: "Aryan Kumar", 
    email: "aryan.kumar@example.com", 
    department: "Electrical", 
    skills: ["Circuit Design", "Power Systems", "PLC"],
    cgpa: 7.9,
    projects: 3,
    competitions: 0
  },
  { 
    id: "7", 
    name: "Sneha Reddy", 
    email: "sneha.reddy@example.com", 
    department: "Computer Science", 
    skills: ["Java", "Android", "Kotlin"],
    cgpa: 9.3,
    projects: 8,
    competitions: 4
  },
  { 
    id: "8", 
    name: "Rahul Kapoor", 
    email: "rahul.kapoor@example.com", 
    department: "Electronics", 
    skills: ["Embedded Systems", "C++", "VHDL"],
    cgpa: 8.0,
    projects: 5,
    competitions: 3
  }
];

// Sample job openings at alumni's company
const jobOpenings = [
  { id: "1", title: "Software Engineer", department: "Engineering", location: "Bangalore", level: "Entry Level" },
  { id: "2", title: "Product Manager", department: "Product", location: "Mumbai", level: "Mid Level" },
  { id: "3", title: "Data Scientist", department: "Analytics", location: "Pune", level: "Entry Level" },
  { id: "4", title: "UX Designer", department: "Design", location: "Bangalore", level: "Entry Level" },
  { id: "5", title: "DevOps Engineer", department: "Engineering", location: "Hyderabad", level: "Mid Level" },
];

const ReferStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [referDialogOpen, setReferDialogOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      jobOpening: "",
      message: ""
    }
  });

  const departments = Array.from(new Set(studentsData.map(student => student.department)));

  const sortedStudents = React.useMemo(() => {
    let sortableStudents = [...studentsData];
    
    if (sortConfig !== null) {
      sortableStudents.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableStudents;
  }, [studentsData, sortConfig]);

  const filteredStudents = sortedStudents.filter(student => {
    // Search filter
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Department filter
    const matchesDepartment = selectedDepartments.length === 0 || 
                              selectedDepartments.includes(student.department);
    
    return matchesSearch && matchesDepartment;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  const toggleStudentSelection = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const toggleAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const onSubmitReferral = (values: any) => {
    // In a real app, this would send the referral to the backend
    toast.success(`${selectedStudents.length} students referred for ${values.jobOpening} position!`);
    setSelectedStudents([]);
    setReferDialogOpen(false);
  };

  const getSortIcon = (key: string) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <RouterGuard allowedRoles={["alumni"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Refer Students</h1>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => toast.success("Student data downloaded!")}
            >
              <Download size={16} /> Export Data
            </Button>
          </div>

          <p className="text-muted-foreground">
            Browse through the student database and refer promising candidates to job openings at your company.
          </p>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search students by name, email, or skills..." 
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

              <Dialog open={referDialogOpen} onOpenChange={setReferDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    disabled={selectedStudents.length === 0} 
                    className="flex items-center gap-1 bg-skillsage-primary hover:bg-skillsage-primary/90"
                  >
                    <Mail size={16} /> Refer Selected ({selectedStudents.length})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Refer Students</DialogTitle>
                    <DialogDescription>
                      You're referring {selectedStudents.length} students to a job opening at your company.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitReferral)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="jobOpening"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Opening</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select job opening" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {jobOpenings.map(job => (
                                  <SelectItem key={job.id} value={job.title}>
                                    {job.title} - {job.location}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Personal Note (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Add a personal note to your referral..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Your note will be shared with the hiring team along with student details.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="submit">Submit Referral</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0} 
                      onCheckedChange={toggleAllStudents}
                      aria-label="Select all students"
                    />
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("name")}>
                      Student Name
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                      {getSortIcon("name") && <span className="ml-1">{getSortIcon("name")}</span>}
                    </div>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("cgpa")}>
                      CGPA
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                      {getSortIcon("cgpa") && <span className="ml-1">{getSortIcon("cgpa")}</span>}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("projects")}>
                      Projects
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                      {getSortIcon("projects") && <span className="ml-1">{getSortIcon("projects")}</span>}
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedStudents.includes(student.id)} 
                        onCheckedChange={() => toggleStudentSelection(student.id)}
                        aria-label={`Select ${student.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{student.cgpa}</TableCell>
                    <TableCell>{student.projects}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{student.name}'s Profile</DialogTitle>
                            <DialogDescription>
                              Complete details and academic information
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Department</p>
                                <p>{student.department}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p>{student.email}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">CGPA</p>
                                <p>{student.cgpa}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Projects</p>
                                <p>{student.projects}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Competitions</p>
                                <p>{student.competitions}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">Skills</p>
                              <div className="flex flex-wrap gap-1">
                                {student.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">Project Highlights</p>
                              <p className="text-sm text-muted-foreground">
                                Project details would be displayed here in a real application.
                              </p>
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button 
                              onClick={() => {
                                if (!selectedStudents.includes(student.id)) {
                                  setSelectedStudents([...selectedStudents, student.id]);
                                }
                                setReferDialogOpen(true);
                              }}
                              className="bg-skillsage-primary hover:bg-skillsage-primary/90"
                            >
                              Refer Student
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
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

export default ReferStudents;
