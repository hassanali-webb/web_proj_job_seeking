"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Briefcase, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/upload");
    }, 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary/30 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Branding/Value Prop */}
        <div className="hidden md:block">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="bg-primary p-2 rounded-xl">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">NextHire AI</span>
          </Link>
          <h1 className="text-5xl font-extrabold mb-8 leading-tight">
            Start Your Journey to <br />
            <span className="gradient-text">Success Today.</span>
          </h1>
          <div className="space-y-6">
            <FeatureItem text="AI-powered resume optimization" />
            <FeatureItem text="Personalized job recommendations" />
            <FeatureItem text="Advanced ATS score tracking" />
            <FeatureItem text="Interview preparation assistant" />
          </div>
        </div>

        {/* Right Side: Form */}
        <Card className="shadow-2xl border-none">
          <CardHeader>
            <CardTitle className="text-3xl">Create Account</CardTitle>
            <CardDescription>Join 10k+ professionals and get matched today.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="Alex" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Johnson" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="alex@example.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="••••••••" required />
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
      <div className="bg-primary/10 p-1 rounded-full">
        <CheckCircle className="w-6 h-6 text-primary" />
      </div>
      <span>{text}</span>
    </div>
  );
}
