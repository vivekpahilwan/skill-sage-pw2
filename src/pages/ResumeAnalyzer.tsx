
import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Check, AlertCircle, Lightbulb, FileText, Copy, Download } from "lucide-react";
import { RouterGuard } from "@/components/RouterGuard";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sample analysis results
  const analysisResults = {
    overallScore: 76,
    sections: {
      format: 85,
      content: 70,
      keywords: 80,
      ats: 68,
    },
    feedbacks: [
      { type: "positive", message: "Good use of action verbs in experience descriptions." },
      { type: "positive", message: "Clear organization with well-defined sections." },
      { type: "positive", message: "Quantified achievements with metrics and percentages." },
      { type: "improvement", message: "Add more industry-specific keywords relevant to job postings." },
      { type: "improvement", message: "Experience section could benefit from more concrete results." },
      { type: "improvement", message: "Consider adding a brief professional summary at the top." },
      { type: "critical", message: "Resume is slightly too dense, making it difficult for ATS systems to parse." },
      { type: "critical", message: "Contact information should be more prominent at the top of the resume." }
    ],
    keywords: {
      present: ["JavaScript", "React", "Node.js", "HTML/CSS", "Git", "Problem-solving"],
      missing: ["TypeScript", "AWS", "CI/CD", "Agile", "Testing", "Docker"]
    },
    improvements: [
      "Add a concise professional summary highlighting your career goals and key strengths.",
      "Quantify more achievements in your work experience with specific metrics.",
      "Include the technologies and tools used in each project or role.",
      "Remove outdated experiences that aren't relevant to your current career goals.",
      "Ensure consistent formatting throughout the document."
    ]
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    if (!file) {
      toast.error("Please upload a resume first.");
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis process with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setIsAnalyzed(true);
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  const resetAnalysis = () => {
    setFile(null);
    setIsAnalyzing(false);
    setIsAnalyzed(false);
    setProgress(0);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-amber-600";
    return "bg-red-600";
  };

  return (
    <RouterGuard allowedRoles={["student"]}>
      <MainLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Resume Analyzer</h1>
          <p className="text-muted-foreground">
            Get a comprehensive analysis of your resume and actionable feedback to improve it for your job applications.
          </p>

          {!isAnalyzed ? (
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
                    <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Upload your resume</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-md mt-1 mb-4">
                      Drag and drop your resume file here, or click to browse. We support PDF, DOCX, and TXT formats.
                    </p>
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="resume-upload">
                      <Button as="span" className="cursor-pointer">
                        Browse Files
                      </Button>
                    </label>
                    {file && (
                      <div className="mt-4 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-skillsage-primary" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                    )}
                  </div>

                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Analyzing your resume...</span>
                        <span className="text-sm">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="text-sm text-muted-foreground">
                        This may take a few moments. We're checking format, content, keywords, and ATS compatibility.
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={startAnalysis} 
                      className="w-full"
                      disabled={!file}
                    >
                      Analyze Resume
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Analysis Results</h2>
                <Button variant="outline" onClick={resetAnalysis}>
                  Analyze Another Resume
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className={`text-3xl font-bold ${getScoreColor(analysisResults.overallScore)}`}>
                      {analysisResults.overallScore}/100
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress 
                      value={analysisResults.overallScore} 
                      className={`h-2 ${getProgressColor(analysisResults.overallScore)}`}
                    />
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Format & Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className={`text-3xl font-bold ${getScoreColor(analysisResults.sections.format)}`}>
                      {analysisResults.sections.format}/100
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress 
                      value={analysisResults.sections.format} 
                      className={`h-2 ${getProgressColor(analysisResults.sections.format)}`} 
                    />
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Content Quality</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className={`text-3xl font-bold ${getScoreColor(analysisResults.sections.content)}`}>
                      {analysisResults.sections.content}/100
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress 
                      value={analysisResults.sections.content} 
                      className={`h-2 ${getProgressColor(analysisResults.sections.content)}`} 
                    />
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">ATS Compatibility</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className={`text-3xl font-bold ${getScoreColor(analysisResults.sections.ats)}`}>
                      {analysisResults.sections.ats}/100
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress 
                      value={analysisResults.sections.ats} 
                      className={`h-2 ${getProgressColor(analysisResults.sections.ats)}`} 
                    />
                  </CardFooter>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Keywords Analysis</CardTitle>
                    <CardDescription>Industry-specific terms in your resume</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" /> 
                        Present Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.keywords.present.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-50">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-600 mr-2" /> 
                        Missing Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.keywords.missing.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-red-600 border-red-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Adding these missing keywords could improve your resume's visibility to recruiters and ATS systems.
                    </p>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Feedback</CardTitle>
                    <CardDescription>Specific observations about your resume</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="positive">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            Strengths
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {analysisResults.feedbacks
                              .filter(feedback => feedback.type === "positive")
                              .map((feedback, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-sm">{feedback.message}</span>
                                </li>
                              ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="improvements">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Lightbulb className="h-4 w-4 text-amber-600 mr-2" />
                            Improvements
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {analysisResults.feedbacks
                              .filter(feedback => feedback.type === "improvement")
                              .map((feedback, index) => (
                                <li key={index} className="flex items-start">
                                  <Lightbulb className="h-4 w-4 text-amber-600 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-sm">{feedback.message}</span>
                                </li>
                              ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="critical">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                            Critical Issues
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {analysisResults.feedbacks
                              .filter(feedback => feedback.type === "critical")
                              .map((feedback, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-sm">{feedback.message}</span>
                                </li>
                              ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Improvements</CardTitle>
                  <CardDescription>Action items to enhance your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-skillsage-primary mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => toast.success("Feedback copied to clipboard!")}
                  >
                    <Copy className="h-4 w-4" /> Copy All Feedback
                  </Button>
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => toast.success("Report downloaded!")}
                  >
                    <Download className="h-4 w-4" /> Download Full Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </MainLayout>
    </RouterGuard>
  );
};

export default ResumeAnalyzer;
