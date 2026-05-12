"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { parseResume } from "@/lib/resumeParser";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    try {
      const result = await parseResume(file);
      setAnalysis(result);
      setIsAnalyzed(true);
      // In a real app, you'd save this to a database or context
      localStorage.setItem("userResume", JSON.stringify(result));
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Analyze Your Resume</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload your resume in PDF, DOCX, or TXT format and our AI will extract your skills and calculate your ATS score.
          </p>
        </div>

        {!isAnalyzed ? (
          <Card className="border-dashed border-2 border-primary/20 bg-primary/5 p-12 text-center transition-all hover:border-primary/40">
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
            />
            
            {!file ? (
              <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-lg font-bold">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PDF, DOCX, TXT up to 10MB</p>
                </div>
              </label>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 bg-background p-4 rounded-xl border border-border shadow-sm w-full max-w-md">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="p-1 hover:bg-secondary rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full max-w-md gap-2" 
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Start Analysis
                    </>
                  )}
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <div className="space-y-8 animate-in">
            {/* Analysis Results Summary */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center relative">
                    <span className="text-3xl font-bold">{analysis.atsScore}%</span>
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="48" cy="48" r="44" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="4"
                        strokeDasharray={276}
                        strokeDashoffset={276 - (276 * analysis.atsScore) / 100}
                        className="text-white transition-all duration-1000 ease-out"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">ATS Analysis Complete!</h2>
                    <p className="text-primary-foreground/80">Your resume is well-optimized for 85% of tracking systems.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="secondary" onClick={() => router.push("/dashboard")}>
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20" onClick={() => router.push("/recommendations")}>
                    View Jobs <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Extracted Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {analysis.skills.map(skill => (
                    <span key={skill} className="bg-secondary px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suggestions for Improvement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <SuggestionItem text="Add more quantitative results to your work experience." />
                  <SuggestionItem text="Mention specific cloud platforms like Azure or GCP." />
                  <SuggestionItem text="Use more action verbs like 'orchestrated' or 'spearheaded'." />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function SuggestionItem({ text }) {
  return (
    <div className="flex gap-3 text-sm">
      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
      <span>{text}</span>
    </div>
  );
}
