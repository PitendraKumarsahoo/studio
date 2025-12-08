import AboutPage from "@/components/pages/AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Our Mission & Story | ResumeAI",
  description: "Learn about ResumeAI's mission to help job seekers create professional resumes with AI-powered tools. Meet our team and discover our values.",
};

export default function Page() {
  return <AboutPage />;
}
