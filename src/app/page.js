import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  FileText, 
  Search, 
  Zap, 
  TrendingUp, 
  ShieldCheck,
  Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-8 border border-primary/10 animate-in">
            <Zap className="w-4 h-4" />
            <span>The Future of AI Recruitment</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight animate-in">
            Land Your Dream Job with <br />
            <span className="gradient-text">AI-Powered Precision</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in [animation-delay:200ms]">
            Upload your resume and let our AI match you with the top 10 most relevant jobs. 
            Optimize your ATS score and get hired faster by industry leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in [animation-delay:400ms]">
            <Link href="/upload">
              <Button size="lg" className="px-10 h-14 text-lg">
                Upload Your Resume
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" size="lg" className="px-10 h-14 text-lg">
                Browse Live Jobs
              </Button>
            </Link>
          </div>
          
          {/* Stats / Trust */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-bold italic">LinkedIn</span>
            <span className="text-2xl font-bold italic">Indeed</span>
            <span className="text-2xl font-bold italic">Glassdoor</span>
            <span className="text-2xl font-bold italic">ZipRecruiter</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose NextHire AI?</h2>
            <p className="text-muted-foreground">Comprehensive tools to accelerate your career growth.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileText className="w-8 h-8 text-primary" />}
              title="Smart Parsing"
              description="Automatically extract skills, experience, and education from any resume format with 99% accuracy."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-primary" />}
              title="ATS Optimization"
              description="Get a detailed ATS score and suggestions on how to improve your resume for modern screening systems."
            />
            <FeatureCard 
              icon={<Search className="w-8 h-8 text-primary" />}
              title="AI Job Matching"
              description="Our weighted algorithm finds the best roles based on your unique skill set and career trajectory."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="bg-primary text-primary-foreground p-12 relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Ready to jumpstart your career?</h2>
                <p className="text-primary-foreground/80 mb-8 text-lg">
                  Join 10,000+ professionals who have optimized their career path with our AI insights.
                </p>
                <div className="flex gap-4">
                  <Link href="/register">
                    <Button variant="secondary" size="lg">Create Free Account</Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex justify-end">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20">
                    <div className="text-3xl font-bold mb-1">92%</div>
                    <div className="text-xs uppercase tracking-wider opacity-70">Match Rate</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20">
                    <div className="text-3xl font-bold mb-1">10k+</div>
                    <div className="text-xs uppercase tracking-wider opacity-70">Users</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20">
                    <div className="text-3xl font-bold mb-1">4.9/5</div>
                    <div className="text-xs uppercase tracking-wider opacity-70">Rating</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20">
                    <div className="text-3xl font-bold mb-1">24/7</div>
                    <div className="text-xs uppercase tracking-wider opacity-70">Support</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold">NextHire AI</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 NextHire AI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="hover:shadow-lg transition-all hover:-translate-y-1 border-none shadow-sm bg-card/50">
      <CardContent className="pt-8">
        <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
