import FAQsPage from "@/components/pages/FAQsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs - Frequently Asked Questions | ResumeAI",
  description: "Find answers to common questions about ResumeAI. Learn about features, pricing, templates, and how to create the perfect resume.",
};

export default function Page() {
  return <FAQsPage />;
}
