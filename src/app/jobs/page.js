"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function PlaceholderPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-12 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
        <p className="text-muted-foreground">This feature is currently under development.</p>
      </main>
    </div>
  );
}
