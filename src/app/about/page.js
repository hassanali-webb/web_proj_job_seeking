"use client";

import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Target, Users, Zap, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-bold text-primary mb-6">
              <Zap className="w-4 h-4" /> Our Mission
            </div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
              Revolutionizing Recruitment with <span className="gradient-text">Artificial Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              At NextHire AI, we believe the right job can change a life, and the right hire can change a company. 
              Our goal is to remove the friction from the hiring process using advanced AI matching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <ValueCard 
              icon={<Target className="text-blue-500" />} 
              title="Precision Matching" 
              description="Our weighted algorithm analyzes deep skill sets, not just keywords, to find the perfect cultural and technical fit."
            />
            <ValueCard 
              icon={<ShieldCheck className="text-green-500" />} 
              title="Transparency" 
              description="We provide candidates with detailed ATS scores and breakdown analysis to help them understand their market position."
            />
          </div>

          <Card className="bg-primary text-primary-foreground p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <Heart className="w-12 h-12 mx-auto mb-6 text-red-300" />
              <h2 className="text-3xl font-bold mb-4">Built for Professionals, by Professionals</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                We're a team of engineers, designers, and HR experts dedicated to building the most 
                effective recruitment ecosystem in the world.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" />
          </Card>
        </div>
      </main>

      <footer className="py-12 border-t border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2026 NextHire AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <Card className="border-none shadow-sm bg-secondary/30">
      <CardContent className="p-8">
        <div className="bg-background w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
