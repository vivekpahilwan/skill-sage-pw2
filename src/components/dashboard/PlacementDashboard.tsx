
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Building, FileCheck, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useNavigate } from "react-router-dom";

export const PlacementDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const placementStats = [
    { id: 1, title: "Total Students", value: 453, icon: Users, change: "+23 from last year", changeType: "positive" },
    { id: 2, title: "Placed Students", value: 301, icon: FileCheck, change: "+42 from last year", changeType: "positive" },
    { id: 3, title: "Companies Visited", value: 27, icon: Building, change: "+4 from last year", changeType: "positive" },
    { id: 4, title: "Active Opportunities", value: 16, icon: BriefcaseBusiness, change: "-3 from last month", changeType: "negative" },
  ];

  const placementData = [
    { month: "Jan", placements: 12 },
    { month: "Feb", placements: 19 },
    { month: "Mar", placements: 25 },
    { month: "Apr", placements: 18 },
    { month: "May", placements: 29 },
    { month: "Jun", placements: 34 },
    { month: "Jul", placements: 31 },
    { month: "Aug", placements: 43 },
    { month: "Sep", placements: 38 },
    { month: "Oct", placements: 52 },
    { month: "Nov", placements: 47 },
    { month: "Dec", placements: 32 },
  ];

  const departmentData = [
    { department: "Computer Science", students: 120, placed: 98 },
    { department: "Electronics", students: 85, placed: 64 },
    { department: "Mechanical", students: 78, placed: 53 },
    { department: "Civil", students: 62, placed: 41 },
    { department: "Electrical", students: 74, placed: 45 },
  ];

  const placementRatioData = [
    { name: "Placed", value: 301, color: "#10b981" },
    { name: "Unplaced", value: 152, color: "#f59e0b" },
  ];
  
  const recentOpportunities = [
    { id: 1, company: "Google", role: "Software Engineer", deadline: "Apr 20, 2025", status: "Active" },
    { id: 2, company: "Microsoft", role: "Product Manager", deadline: "Apr 25, 2025", status: "Active" },
    { id: 3, company: "Amazon", role: "Data Scientist", deadline: "May 5, 2025", status: "Active" },
  ];

  const handleCreateOpportunity = () => {
    navigate("/jobs/create");
  };

  const handleViewAllOpportunities = () => {
    navigate("/jobs");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold">Placement Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <Button 
            className="bg-skillsage-primary hover:bg-skillsage-primary/90"
            onClick={handleCreateOpportunity}
          >
            Post New Opportunity
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {placementStats.map((stat) => (
          <Card key={stat.id} className="animate-slide-in" style={{ animationDelay: `${stat.id * 50}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Trends */}
        <Card className="animate-slide-in col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Placement Trends</CardTitle>
            <CardDescription>Monthly placement statistics for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={placementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="placementColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Area 
                  type="monotone" 
                  dataKey="placements" 
                  stroke="#1e3a8a" 
                  fillOpacity={1} 
                  fill="url(#placementColor)" 
                  name="Placements"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department-wise Placement */}
        <Card className="animate-slide-in" style={{ animationDelay: "150ms" }}>
          <CardHeader>
            <CardTitle>Department-wise Placement</CardTitle>
            <CardDescription>Placement status by academic department</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="students" name="Total Students" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placed" name="Placed" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Placement Ratio */}
        <Card className="animate-slide-in" style={{ animationDelay: "250ms" }}>
          <CardHeader>
            <CardTitle>Placement Ratio</CardTitle>
            <CardDescription>Overall placement percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={placementRatioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {placementRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="text-center">
                <div className="text-xl font-bold">66.4%</div>
                <div className="text-sm text-muted-foreground">Overall Placement Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Opportunities */}
      <Card className="animate-slide-in" style={{ animationDelay: "300ms" }}>
        <CardHeader>
          <CardTitle>Recent Job Opportunities</CardTitle>
          <CardDescription>Latest opportunities posted for students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">{opportunity.role}</h4>
                    <Badge variant="outline" className="ml-2">{opportunity.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{opportunity.company}</div>
                  <div className="text-xs">Deadline: {opportunity.deadline}</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/jobs/edit/${opportunity.id}`)}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/jobs/applicants/${opportunity.id}`)}>View Applicants</Button>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={handleViewAllOpportunities}
          >
            View All Opportunities
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
