import ATSCheckerPage from "@/components/pages/ATSCheckerPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATS Resume Checker - Optimize Your Resume | ResumeAI",
  description: "Check your resume's ATS compatibility. Get instant feedback on formatting, keywords, and optimization tips.",
};

export default function Page() {
  return <ATSCheckerPage />;
}
