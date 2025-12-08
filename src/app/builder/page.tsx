import ResumeBuilderPage from "@/components/pages/ResumeBuilderPage";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Resume Builder - Create Your Professional Resume | ResumeAI",
  description: "Build your professional resume with our AI-powered builder. Choose templates, add content, and export in multiple formats.",
};

function BuilderSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:sticky lg:top-24 space-y-4" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<BuilderSkeleton />}>
      <ResumeBuilderPage />
    </Suspense>
  );
}
