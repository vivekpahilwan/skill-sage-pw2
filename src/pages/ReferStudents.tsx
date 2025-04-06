
import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Search, Download, Filter, HandHelping, FileText } from "lucide-react";
import { toast } from "sonner";
import ReferralDialog from "@/components/alumni/ReferralDialog";

// Mock student data
const studentsData = [
  {
    id: 1,
    name: "Alex Wong",
    email: "alex.wong@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    skills: ["React", "Node.js", "AWS"],
    department: "Computer Science",
    year: "4th Year",
    cgpa: 8.7,
    projects: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    avatar: "https://i.pravatar.cc/150?img=25",
    skills: ["Python", "Data Science", "Machine Learning"],
    department: "Data Science",
    year: "4th Year",
    cgpa: 9.3,
    projects: 4
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "https://i.pravatar.cc/150?img=15",
    skills: ["UI/UX", "Figma", "JavaScript"],
    department: "Design",
    year: "3rd Year",
    cgpa: 8.5,
    projects: 7
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa.chen@example.com",
    avatar: "https://i.pravatar.cc/150?img=33",
    skills: ["Project Management", "Agile", "Jira"],
    department: "Business",
    year: "4th Year",
    cgpa: 8.8,
    projects: 6
  },
  {
    id: 5,
    name: "Raj Kumar",
    email: "raj.kumar@example.com",
    avatar: "https://i.pravatar.cc/150?img=18",
    skills: ["Java", "Spring Boot", "Microservices"],
    department: "Computer Science",
    year: "4th Year",
    cgpa: 8.2,
    projects: 5
  },
  {
    id: 6,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    avatar: "https://i.pravatar.cc/150?img=23",
    skills: ["C++", "Data Structures", "Algorithms"],
    department: "Computer Science",
    year: "3rd Year",
    cgpa: 9.0,
    projects: 3
  },
  {
    id: 7,
    name: "David Lee",
    email: "david.lee@example.com",
    avatar: "https://i.pravatar.cc/150?img=17",
    skills: ["Mobile Development", "Flutter", "Firebase"],
    department: "Electronics",
    year: "4th Year",
    cgpa: 8.4,
    projects: 6
  },
  {
    id: 8,
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    avatar: "https://i.pravatar.cc/150?img=24",
    skills: ["Digital Marketing", "SEO", "Content Creation"],
    department: "Business",
    year: "4th Year",
    cgpa: 8.6,
    projects: 4
  }
];

const ReferStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false);
  
  // Extract unique departments and skills
  const departments = Array.from(new Set(studentsData.map(student => student.department)));
  const skills = Array.from(new Set(studentsData.flatMap(student => student.skills)));
  
  // Filter students based on search term and filters
  const filteredStudents = studentsData.filter(student => {
    // Search filter
    if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !student.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Department filter
    if (selectedDepartments.length > 0 && !selectedDepartments.includes(student.department)) {
      return false;
    }
    
    // Skills filter
    if (selectedSkills.length > 0 && !student.skills.some(skill => selectedSkills.includes(skill))) {
      return false;
    }
    
    return true;
  });
  
  const handleToggleStudent = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };
  
  const exportSelectedStudentsCSV = () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student to export");
      return;
    }
    
    // Get selected students data
    const studentsToExport = studentsData.filter(student => selectedStudents.includes(student.id));
    
    // Generate CSV content
    const headers = ["Name", "Email", "Department", "Year", "CGPA", "Skills"];
    const csvContent = [
      headers.join(","),
      ...studentsToExport.map(student => 
        [
          student.name,
          student.email,
          student.department,
          student.year,
          student.cgpa,
          `"${student.skills.join(", ")}"`
        ].join(",")
      )
    ].join("\n");
    
    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "selected_students.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${selectedStudents.length} students exported successfully`);
  };
  
  const exportSelectedStudentsExcel = () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student to export");
      return;
    }
    
    // Get selected students data
    const studentsToExport = studentsData.filter(student => selectedStudents.includes(student.id));
    
    // Generate CSV content (for Excel)
    const headers = ["Name", "Email", "Department", "Year", "CGPA", "Skills"];
    const csvContent = [
      headers.join(","),
      ...studentsToExport.map(student => 
        [
          student.name,
          student.email,
          student.department,
          student.year,
          student.cgpa,
          `"${student.skills.join(", ")}"`
        ].join(",")
      )
    ].join("\n");
    
    // Create and download file
    const blob = new Blob([csvContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "selected_students.xls");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${selectedStudents.length} students exported successfully`);
  };
  
  const handleReferSelectedStudents = () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student to refer");
      return;
    }
    
    // Open the referral dialog instead of just showing a toast
    setIsReferralDialogOpen(true);
  };

  // Get selected students' data for the referral dialog
  const getSelectedStudentsData = () => {
    return studentsData
      .filter(student => selectedStudents.includes(student.id))
      .map(({ id, name, email }) => ({ id, name, email }));
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Refer Students</h1>
          
          <div className="space-x-2">
            {selectedStudents.length > 0 && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download size={16} /> Export Selected
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportSelectedStudentsCSV}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Export as CSV</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportSelectedStudentsExcel}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Export as Excel</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button onClick={handleReferSelectedStudents}>
                  <HandHelping className="mr-2 h-4 w-4" />
                  Refer Selected ({selectedStudents.length})
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <Card className="w-full lg:w-1/4">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search by name, email or skills" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Filter size={16} className="mr-2" />
                      {selectedDepartments.length > 0 
                        ? `${selectedDepartments.length} selected` 
                        : "All Departments"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {departments.map(dept => (
                      <DropdownMenuCheckboxItem
                        key={dept}
                        checked={selectedDepartments.includes(dept)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedDepartments([...selectedDepartments, dept]);
                          } else {
                            setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                          }
                        }}
                      >
                        {dept}
                      </DropdownMenuCheckboxItem>
                    ))}
                    {selectedDepartments.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => setSelectedDepartments([])}
                          className="justify-center text-center"
                        >
                          Clear Filters
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Skills</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Filter size={16} className="mr-2" />
                      {selectedSkills.length > 0 
                        ? `${selectedSkills.length} selected` 
                        : "All Skills"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {skills.map(skill => (
                      <DropdownMenuCheckboxItem
                        key={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSkills([...selectedSkills, skill]);
                          } else {
                            setSelectedSkills(selectedSkills.filter(s => s !== skill));
                          }
                        }}
                      >
                        {skill}
                      </DropdownMenuCheckboxItem>
                    ))}
                    {selectedSkills.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => setSelectedSkills([])}
                          className="justify-center text-center"
                        >
                          Clear Filters
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartments([]);
                  setSelectedSkills([]);
                }}
              >
                Reset All Filters
              </Button>
            </CardContent>
          </Card>
          
          {/* Students Grid */}
          <div className="w-full lg:w-3/4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Students</CardTitle>
                  <CardDescription>
                    {filteredStudents.length} students found matching your criteria
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="select-all" 
                    checked={selectedStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm cursor-pointer">
                    {selectedStudents.length === filteredStudents.length ? "Deselect All" : "Select All"}
                  </label>
                </div>
              </CardHeader>
              <CardContent>
                {filteredStudents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredStudents.map(student => (
                      <Card key={student.id} className={`overflow-hidden ${selectedStudents.includes(student.id) ? 'border-primary' : ''}`}>
                        <CardContent className="p-0">
                          <div className="p-4 pb-3 flex justify-between items-start">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{student.name}</h3>
                                <p className="text-sm text-muted-foreground">{student.email}</p>
                              </div>
                            </div>
                            <Checkbox 
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={() => handleToggleStudent(student.id)}
                            />
                          </div>
                          
                          <div className="px-4 pb-3">
                            <div className="flex justify-between text-sm">
                              <span>{student.department}</span>
                              <span>{student.year}</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">CGPA: </span>
                              <span>{student.cgpa}</span>
                            </div>
                          </div>
                          
                          <div className="px-4 pb-4">
                            <div className="text-sm font-medium mb-2">Skills:</div>
                            <div className="flex flex-wrap gap-1">
                              {student.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border-t p-3 flex justify-between items-center bg-muted/50">
                            <span className="text-xs text-muted-foreground">{student.projects} Projects</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8"
                              onClick={() => {
                                setSelectedStudents([student.id]);
                                setIsReferralDialogOpen(true);
                              }}
                            >
                              <HandHelping className="h-4 w-4 mr-1" />
                              Refer
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No students found matching the selected filters.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedDepartments([]);
                        setSelectedSkills([]);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Referral Dialog */}
        <ReferralDialog 
          isOpen={isReferralDialogOpen}
          onClose={() => setIsReferralDialogOpen(false)}
          students={getSelectedStudentsData()}
        />
      </div>
    </MainLayout>
  );
};

export default ReferStudents;
