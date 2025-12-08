import HomePage from "@/components/pages/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Resume Builder - Create Professional Resumes in Minutes | ResumeAI",
  description: "Build ATS-optimized professional resumes with AI-powered tools. Choose from 18+ templates and land your dream job faster.",
};

export default function Home() {
  return <HomePage />;
}
