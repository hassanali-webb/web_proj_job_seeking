"use client";

import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings as SettingsIcon, 
  Lock, 
  Bell, 
  Eye, 
  Globe, 
  Shield,
  Trash2,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">Manage your account preferences and security.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <SettingSection 
                title="Security" 
                description="Manage your password and authentication methods."
                icon={<Lock className="text-primary w-5 h-5" />}
              >
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                  <div>
                    <div className="font-bold">Password</div>
                    <div className="text-sm text-muted-foreground">Last changed 3 months ago</div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                  <div>
                    <div className="font-bold">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Currently disabled</div>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </SettingSection>

              <SettingSection 
                title="Preferences" 
                description="Customize your experience and visibility."
                icon={<Globe className="text-primary w-5 h-5" />}
              >
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-bold">Public Profile</div>
                    <div className="text-sm text-muted-foreground">Allow recruiters to find you</div>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
                  </div>
                </div>
              </SettingSection>
            </div>

            <div className="space-y-6">
              <Card className="border-red-100 bg-red-50/30">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-red-600/70 mb-4">Deleting your account is permanent and cannot be undone.</p>
                  <Button variant="destructive" size="sm" className="w-full gap-2">
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingSection({ title, description, icon, children }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}
