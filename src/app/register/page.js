"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Briefcase, CheckCircle, AlertCircle, Building2, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const [role, setRole] = useState("candidate");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    orgName: "",
    orgWebsite: "",
    industry: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const result = register({ ...formData, role });
    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary/30 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Dynamic Branding */}
        <div className="hidden md:block">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="bg-primary p-2 rounded-xl"><Briefcase className="w-6 h-6 text-white" /></div>
            <span className="text-2xl font-bold">NextHire AI</span>
          </Link>
          <h1 className="text-5xl font-extrabold mb-8 leading-tight">
            {role === "candidate" ? "Land Your Dream" : "Hire Your Dream"} <br />
            <span className="gradient-text">{role === "candidate" ? "Career Today." : "Team Today."}</span>
          </h1>
          <div className="space-y-6">
            <FeatureItem text={role === "candidate" ? "AI-powered resume optimization" : "AI-powered candidate matching"} />
            <FeatureItem text={role === "candidate" ? "Personalized job recommendations" : "Detailed ATS scoring for applicants"} />
            <FeatureItem text={role === "candidate" ? "Advanced ATS score tracking" : "Organization-wide talent management"} />
          </div>
        </div>

        {/* Right Side: Enhanced Form */}
        <Card className="shadow-2xl border-none">
          <CardHeader>
            <div className="flex gap-4 mb-6 p-1 bg-secondary rounded-xl">
              <button 
                onClick={() => setRole("candidate")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${role === "candidate" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:bg-white/50"}`}
              >
                <User className="w-4 h-4" /> Candidate
              </button>
              <button 
                onClick={() => setRole("recruiter")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${role === "recruiter" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:bg-white/50"}`}
              >
                <Building2 className="w-4 h-4" /> Recruiter
              </button>
            </div>
            <CardTitle className="text-3xl">Create {role === "candidate" ? "Account" : "Recruiter Profile"}</CardTitle>
            <CardDescription>{role === "candidate" ? "Join 10k+ professionals" : "Find the best talent for your organization"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">{error}</div>}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input name="firstName" placeholder="Alex" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input name="lastName" placeholder="Johnson" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input name="email" type="email" placeholder="alex@company.com" value={formData.email} onChange={handleChange} required />
              </div>

              {role === "recruiter" && (
                <div className="space-y-4 p-4 bg-primary/5 rounded-xl border border-primary/10 animate-in">
                  <div className="text-xs font-bold uppercase text-primary">Organization Details</div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input name="orgName" placeholder="TechCorp Inc." value={formData.orgName} onChange={handleChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Website</label>
                      <Input name="orgWebsite" placeholder="https://..." value={formData.orgWebsite} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Industry</label>
                      <Input name="industry" placeholder="Software" value={formData.industry} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              </div>

              <Button type="submit" className="w-full h-12 text-lg mt-6" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Get Started Free"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

function FeatureItem({ text }) {
  return (
    <div className="flex items-center gap-4 text-lg">
      <div className="bg-primary/10 p-1 rounded-full"><CheckCircle className="w-6 h-6 text-primary" /></div>
      <span>{text}</span>
    </div>
  );
}
