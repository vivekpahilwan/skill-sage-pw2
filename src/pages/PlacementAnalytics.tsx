
import React from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RouterGuard } from "@/components/RouterGuard";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PlacementAnalytics = () => {
  // Sample data for analytics
  const yearlyData = [
    { year: "2021", placed: 230, total: 320, ratio: 71.9 },
    { year: "2022", placed: 255, total: 342, ratio: 74.6 },
    { year: "2023", placed: 285, total: 365, ratio: 78.1 },
    { year: "2024", placed: 301, total: 390, ratio: 77.2 },
    { year: "2025", placed: 278, total: 360, ratio: 77.2 },
  ];

  const departmentData = [
    { department: "Computer Science", placed: 98, total: 120, ratio: 81.7 },
    { department: "Electronics", placed: 64, total: 85, ratio: 75.3 },
    { department: "Mechanical", placed: 53, total: 78, ratio: 67.9 },
    { department: "Civil", placed: 41, total: 62, ratio: 66.1 },
    { department: "Electrical", placed: 45, total: 74, ratio: 60.8 },
  ];

  const companyHiringData = [
    { name: "Google", value: 12, color: "#4285F4" },
    { name: "Microsoft", value: 15, color: "#00a1f1" },
    { name: "Amazon", value: 18, color: "#ff9900" },
    { name: "TCS", value: 28, color: "#282828" },
    { name: "Infosys", value: 22, color: "#007cc5" },
    { name: "Others", value: 25, color: "#8884d8" }
  ];

  const salaryRangeData = [
    { range: "<5 LPA", count: 45 },
    { range: "5-10 LPA", count: 98 },
    { range: "10-15 LPA", count: 62 },
    { range: "15-20 LPA", count: 38 },
    { range: "20-25 LPA", count: 19 },
    { range: ">25 LPA", count: 8 }
  ];

  const monthWisePlacementData = [
    { month: "Jun", count: 15 },
    { month: "Jul", count: 22 },
    { month: "Aug", count: 35 },
    { month: "Sep", count: 48 },
    { month: "Oct", count: 62 },
    { month: "Nov", count: 45 },
    { month: "Dec", count: 38 },
    { month: "Jan", count: 25 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 11 },
    { month: "Apr", count: 8 },
    { month: "May", count: 5 }
  ];

  const jobRoleData = [
    { role: "Software Engineer", count: 86 },
    { role: "Data Scientist", count: 28 },
    { role: "Product Manager", count: 14 },
    { role: "UI/UX Designer", count: 19 },
    { role: "DevOps Engineer", count: 23 },
    { role: "Others", count: 32 },
  ];

  return (
    <RouterGuard allowedRoles={["placement"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold">Placement Analytics</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Academic Year:</span>
              <Select defaultValue="2025">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2024-2025</SelectItem>
                  <SelectItem value="2024">2023-2024</SelectItem>
                  <SelectItem value="2023">2022-2023</SelectItem>
                  <SelectItem value="2022">2021-2022</SelectItem>
                  <SelectItem value="2021">2020-2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">390</div>
                <p className="text-xs text-muted-foreground">+25 from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">301</div>
                <p className="text-xs text-muted-foreground">+16 from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Placement Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">77.2%</div>
                <p className="text-xs text-muted-foreground">-0.9% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.4 LPA</div>
                <p className="text-xs text-muted-foreground">+1.2 LPA from last year</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="yearly">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="yearly">Yearly Trends</TabsTrigger>
              <TabsTrigger value="department">Department-wise</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="salary">Salary Distribution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="yearly">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Yearly Placement Ratio</CardTitle>
                    <CardDescription>Placement percentage over the last 5 years</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={yearlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ratio" stroke="#8884d8" name="Placement %" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Placements</CardTitle>
                    <CardDescription>Placement count by month in current year</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={monthWisePlacementData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorPlacement" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="count" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#colorPlacement)" 
                          name="Students Placed"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="department">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Department-wise Placement</CardTitle>
                    <CardDescription>Number of placed vs. total students by department</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={departmentData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" name="Total Students" fill="#8884d8" />
                        <Bar dataKey="placed" name="Placed Students" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Department-wise Ratio</CardTitle>
                    <CardDescription>Placement percentage by department</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={departmentData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="department" type="category" />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="ratio" name="Placement Ratio (%)" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="companies">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company-wise Recruitment</CardTitle>
                    <CardDescription>Distribution of students across companies</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={companyHiringData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {companyHiringData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} students`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Job Role Distribution</CardTitle>
                    <CardDescription>Students placed by job role</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={jobRoleData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="role" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" name="Students" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="salary">
              <Card>
                <CardHeader>
                  <CardTitle>Salary Distribution</CardTitle>
                  <CardDescription>Number of students by salary range</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salaryRangeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" name="Number of Students" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </RouterGuard>
  );
};

export default PlacementAnalytics;
