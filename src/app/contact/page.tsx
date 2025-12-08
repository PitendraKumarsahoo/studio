import ContactPage from "@/components/pages/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch | ResumeAI",
  description: "Have questions? Contact ResumeAI support team. We're here to help you create the perfect resume and advance your career.",
};

export default function Page() {
  return <ContactPage />;
}
