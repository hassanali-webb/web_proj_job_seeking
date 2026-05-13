import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = db.read();
  return NextResponse.json(data.jobs || []);
}

export async function POST(request) {
  const jobData = await request.json();
  const data = db.read();
  
  const newJob = {
    ...jobData,
    id: Math.random().toString(36).substr(2, 9),
    postedAt: "Just now",
    source: "NextHire Native"
  };
  
  data.jobs.unshift(newJob);
  db.write(data);
  
  return NextResponse.json({ success: true, job: newJob });
}
