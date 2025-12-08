"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { generateSummaryAI } from '@/lib/aiHelpers';
import { useToast } from '@/hooks/use-toast';

interface SummaryFormProps {
  resumeData: { summary: string, [key: string]: any };
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ resumeData, setResumeData }) => {
  const { toast } = useToast();

  const handleSummaryChange = (value: string) => {
    setResumeData((prev: any) => ({ ...prev, summary: value }));
  };

  const handleGenerateSummary = async () => {
    toast({
      title: '✨ Generating Summary...',
      description: 'AI is crafting your professional summary',
    });
    const summary = await generateSummaryAI(resumeData);
    handleSummaryChange(summary);
    toast({
      title: '✅ Summary Generated!',
      description: 'Your professional summary has been created',
      duration: 3000,
    });
  };

  return (
    <TabsContent value="summary" className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <Label htmlFor="summary" className="text-lg font-semibold">Professional Summary</Label>
        <Button onClick={handleGenerateSummary} size="sm" variant="outline">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate with AI
        </Button>
      </div>
      <Textarea
        id="summary"
        value={resumeData.summary}
        onChange={(e) => handleSummaryChange(e.target.value)}
        placeholder="Write a brief summary of your professional background and key achievements..."
        rows={8}
      />
    </TabsContent>
  );
};

export default SummaryForm;
