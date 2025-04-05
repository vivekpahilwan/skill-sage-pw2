
import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, FileText, Upload, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".docx")) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload a PDF or DOCX file.",
          variant: "destructive",
        });
      }
    }
  };

  const analyzeResume = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "Analysis complete",
        description: "Your resume has been successfully analyzed.",
      });
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Resume Analyzer</h1>
          <p className="text-muted-foreground">Upload your resume for AI-powered analysis and improvement suggestions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription>
              We support PDF and DOCX formats. Maximum file size: 5MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="mb-2">Drag and drop your resume here, or click to browse</p>
              <Input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("resume-upload")?.click()}
                >
                  Select File
                </Button>
              </div>
              {file && (
                <div className="mt-4 text-sm">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={analyzeResume}
              disabled={!file || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </CardFooter>
        </Card>

        {analysisComplete && (
          <>
            <Tabs defaultValue="summary" className="mt-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Overall Score</span>
                          <span className="font-bold">76/100</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h3 className="text-sm font-medium mb-2">Strengths</h3>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Strong technical skills section
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Clear work experience descriptions
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Good educational background
                            </li>
                          </ul>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="text-sm font-medium mb-2">Areas for Improvement</h3>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                              Add more quantifiable achievements
                            </li>
                            <li className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                              Improve resume formatting
                            </li>
                            <li className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                              Add relevant certifications
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-medium">Add more quantifiable achievements</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Include specific metrics, percentages, and numbers to highlight your impact. For example, "Increased sales by 25%" rather than "Increased sales."
                      </p>
                    </div>
                    <Separator />
                    <div className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-medium">Improve resume formatting</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Use consistent spacing, alignment, and font styles. Consider using bullet points for better readability.
                      </p>
                    </div>
                    <Separator />
                    <div className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-medium">Add relevant certifications</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Include industry certifications relevant to your target position to strengthen your qualifications.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Download Full Report
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Analysis</CardTitle>
                    <CardDescription>How your skills match with job market demands</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Technical Skills</span>
                          <span>High Match</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Soft Skills</span>
                          <span>Medium Match</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Industry Knowledge</span>
                          <span>Low Match</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3">Your Key Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge>JavaScript</Badge>
                          <Badge>React</Badge>
                          <Badge>Node.js</Badge>
                          <Badge>CSS</Badge>
                          <Badge>Git</Badge>
                          <Badge>Agile</Badge>
                          <Badge>Problem Solving</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Recommended Skills to Add</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-dashed">TypeScript</Badge>
                          <Badge variant="outline" className="border-dashed">Docker</Badge>
                          <Badge variant="outline" className="border-dashed">AWS</Badge>
                          <Badge variant="outline" className="border-dashed">Project Management</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ResumeAnalyzer;
