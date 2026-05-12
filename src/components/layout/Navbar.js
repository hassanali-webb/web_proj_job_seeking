"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, User, LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass shadow-md py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Next<span className="text-primary">Hire</span> AI
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link>
          <Link href="/analyzer" className="hover:text-primary transition-colors">Resume Analyzer</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 animate-in">
          <Link href="/jobs" onClick={() => setMobileMenuOpen(false)}>Browse Jobs</Link>
          <Link href="/analyzer" onClick={() => setMobileMenuOpen(false)}>Resume Analyzer</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <hr className="border-border" />
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
