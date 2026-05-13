import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  
  if (!userId) {
    return NextResponse.json({ error: "UserId is required" }, { status: 400 });
  }
  
  const resume = db.getResume(userId);
  return NextResponse.json(resume || null);
}

export async function POST(request) {
  const { userId, resumeData } = await request.json();
  
  if (!userId || !resumeData) {
    return NextResponse.json({ error: "UserId and resumeData are required" }, { status: 400 });
  }
  
  db.saveResume(userId, resumeData);
  return NextResponse.json({ success: true });
}
