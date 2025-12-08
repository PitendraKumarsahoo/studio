import TemplatesPage from "@/components/pages/TemplatesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Templates - Choose Your Perfect Design | ResumeAI",
  description: "Browse 18+ professional resume templates. Choose from classic, modern, and creative designs optimized for ATS.",
};

export default function Page() {
  return <TemplatesPage />;
}
