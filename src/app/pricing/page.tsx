import PricingPage from "@/components/pages/PricingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Choose Your Plan | ResumeAI",
  description: "Simple, transparent pricing for everyone. Choose from Free, Pro, or Annual plans to build your perfect resume.",
};

export default function Page() {
  return <PricingPage />;
}
