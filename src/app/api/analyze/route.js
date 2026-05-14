import { NextResponse } from "next/server";
import { analyzeResumeText } from "@/lib/resumeParser";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse/lib/pdf-parse.js");

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let text = "";
    if (file.type === "application/pdf") {
      try {
        const data = await pdf(buffer);
        text = data.text;
      } catch (pdfError) {
        console.warn("PDF parsing failed (often due to formatting/metadata issues), falling back to raw extraction:", pdfError.message);
        text = buffer.toString("utf-8");
      }
    } else {
      text = buffer.toString("utf-8");
    }

    const analysis = analyzeResumeText(text, file.name);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Resume analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
