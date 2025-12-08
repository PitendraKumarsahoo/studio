import BlogPage from "@/components/pages/BlogPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Career Advice & Resume Tips | ResumeAI",
  description: "Expert career advice, resume tips, and job search strategies. Learn how to create better resumes and advance your career.",
};

export default function Page() {
  return <BlogPage />;
}
