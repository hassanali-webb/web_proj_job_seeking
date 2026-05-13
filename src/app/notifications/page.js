"use client";

import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Briefcase, FileText, Sparkles, User, CheckCircle2, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const notifications = [
  {
    id: 1,
    title: "Resume Parsed Successfully",
    message: "Your AI analysis is ready. You achieved an 85% ATS score!",
    time: "2 hours ago",
    icon: <FileText className="text-blue-500" />,
    type: "system"
  },
  {
    id: 2,
    title: "New Job Match Found",
    message: "A new Senior Frontend Engineer role at Vercel matches 92% of your skills.",
    time: "5 hours ago",
    icon: <Sparkles className="text-purple-500" />,
    type: "match"
  },
  {
    id: 3,
    title: "Profile Viewed",
    message: "A recruiter from Meta viewed your profile.",
    time: "Yesterday",
    icon: <User className="text-green-500" />,
    type: "alert"
  }
];

export default function NotificationsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your career progress.</p>
            </div>
            <button className="text-sm text-primary font-bold hover:underline">Mark all as read</button>
          </div>

          <div className="space-y-4">
            {notifications.map((notif) => (
              <Card key={notif.id} className="hover:shadow-md transition-shadow cursor-pointer border-none shadow-sm bg-card">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-xl">
                    {notif.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold">{notif.title}</h3>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase font-bold tracking-wider">
                        <Clock className="w-3 h-3" /> {notif.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-8 border-2 border-dashed border-border rounded-2xl text-center">
            <Bell className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="font-bold text-muted-foreground">No more notifications</h3>
            <p className="text-sm text-muted-foreground/60">We'll alert you when something important happens.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
