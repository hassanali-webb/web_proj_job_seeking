# NextHire AI - Smart Recruitment & Job Recommendation Platform

NextHire AI is a production-grade, AI-powered web application built with Next.js 15. It intelligently connects resumes with highly relevant job opportunities and provides visual analytics to explain why a candidate matches a specific role.

## 🚀 Key Features

- **AI Resume Parsing**: Automatically extract skills, experience, and education from PDF/DOCX resumes.
- **ATS Score Analysis**: Get an instant ATS compatibility score with improvement suggestions.
- **Smart Matching Algorithm**: Weighted matching system (Skills 40%, Experience 30%, Education 10%, Certifications 10%, Keywords 10%).
- **Interactive Dashboard**: Visual analytics using Recharts for skill proficiency and market readiness.
- **Top 10 Recommendations**: Personalized job matching with match percentages and missing skill detection.
- **Modern UI/UX**: Premium SaaS aesthetic with glassmorphism, smooth animations (Framer Motion), and dark/light mode support.

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: LocalStorage (Simulation) / Context API

## 📂 Project Structure

```text
/src
  /app            # Pages and API routes
  /components     # Reusable UI components & layouts
  /lib            # Matching algorithm & Resume parsing logic
  /data           # Mock job data
  /context        # Authentication context
  /hooks          # Custom React hooks
  /utils          # Helper functions
```

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🤖 AI Matching Algorithm

The matching system uses a weighted scoring mechanism:
- **Skills (40%)**: Compares extracted skills against job requirements.
- **Experience (30%)**: Matches years of experience and seniority level.
- **Education (10%)**: Validates academic background.
- **Keywords/Certs (20%)**: Detects specific industry certifications and niche keywords.

## 📝 License

This project is licensed under the MIT License.
