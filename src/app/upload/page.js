"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  FileText, 
  X, 
  Loader2,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Briefcase
} from "lucide-react";
import { parseResume } from "@/lib/resumeParser";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        
        // Save result to DB
        await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, resumeData: result })
        });

        setAnalysis(result);
        setIsAnalyzed(true);
      }
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
          <p className="text-muted-foreground">Our AI identifies your primary career track for the best job matches.</p>
        </div>

        {!isAnalyzed ? (
          <Card className="border-dashed border-2 border-primary/20 bg-primary/5 p-12 text-center transition-all hover:bg-primary/10">
            <input type="file" id="resume-upload" className="hidden" onChange={handleFileChange} accept=".pdf,.docx,.txt" />
            {!file ? (
              <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary"><Upload /></div>
                <div>
                  <p className="text-lg font-bold">Choose a file to analyze</p>
                  <p className="text-sm text-muted-foreground">Supports PDF, DOCX, and TXT</p>
                </div>
              </label>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="bg-background p-4 rounded-xl border border-border w-full max-w-md flex items-center gap-4 shadow-sm">
                  <FileText className="text-primary" />
                  <span className="flex-1 text-left font-bold truncate">{file.name}</span>
                  <X className="cursor-pointer hover:text-red-500" onClick={() => setFile(null)} />
                </div>
                <Button size="lg" className="w-full max-w-md gap-2 h-14 text-lg shadow-xl" onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  {isUploading ? "Identifying Career Track..." : "Analyze Resume"}
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <div className="space-y-6 animate-in">
            <Card className="bg-primary text-primary-foreground p-8 overflow-hidden relative">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Briefcase className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      <span className="text-xs uppercase tracking-widest font-bold text-white/70">Detected Track</span>
                    </div>
                    <h2 className="text-3xl font-bold">{analysis.primaryCategory}</h2>
                    <p className="text-white/80">ATS Score: {analysis.atsScore}% • {analysis.skills.length} skills identified</p>
                  </div>
                </div>
                <Button variant="secondary" size="lg" className="h-14 px-8 font-bold" onClick={() => router.push("/recommendations")}>
                  See {analysis.primaryCategory} Jobs <ArrowRight className="ml-2" />
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4">Top Identified Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.slice(0, 10).map(skill => (
                    <span key={skill} className="bg-secondary px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
                  ))}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-4">AI Recommendations</h3>
                <p className="text-sm text-muted-foreground">Our AI recommends focusing on roles within the <strong>{analysis.primaryCategory}</strong> sector for your next career move.</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
