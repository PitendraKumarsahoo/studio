"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { generateExperienceAI } from '@/lib/aiHelpers';
import { useToast } from '@/hooks/use-toast';

type Experience = {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
};

type ResumeData = {
  experience: Experience[];
};

interface ExperienceFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ resumeData, setResumeData }) => {
  const { toast } = useToast();

  const addExperience = () => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: [...(prev.experience || []), { id: Date.now(), company: '', position: '', startDate: '', endDate: '', description: '', current: false }]
    }));
  };

  const updateExperience = (id: number, field: keyof Experience, value: string | boolean) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: prev.experience.map((exp: Experience) => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: prev.experience.filter((exp: Experience) => exp.id !== id)
    }));
  };

  const handleGenerateExperience = async (expId: number) => {
    const experienceItem = resumeData.experience.find(exp => exp.id === expId);
    if (!experienceItem || !experienceItem.position) {
      toast({ title: '⚠️ Position Required', description: 'Please enter a job position first', variant: 'destructive', duration: 3000 });
      return;
    }
    toast({ title: '✨ Generating Description...', description: 'AI is writing your experience description' });
    const description = await generateExperienceAI(experienceItem);
    updateExperience(expId, 'description', description);
    toast({ title: '✅ Description Generated!', description: 'Your experience description has been created', duration: 3000 });
  };

  return (
    <TabsContent value="experience" className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Work Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {(resumeData.experience || []).length === 0 && (
        <p className="text-muted-foreground text-center py-8">No experience added yet. Click "Add Experience" to start.</p>
      )}

      {(resumeData.experience || []).map((exp) => (
        <div key={exp.id} className="p-4 border border-border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold pt-1">Experience Entry</h4>
            <Button onClick={() => removeExperience(exp.id)} size="icon" variant="ghost">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company</Label>
              <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company Name" />
            </div>
            <div>
              <Label>Position</Label>
              <Input value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Job Title" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} disabled={exp.current} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id={`current-${exp.id}`} checked={exp.current} onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked as boolean)} />
            <Label htmlFor={`current-${exp.id}`} className="font-normal">I currently work here</Label>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Description</Label>
              <Button onClick={() => handleGenerateExperience(exp.id)} size="sm" variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
            <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..." rows={4} />
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default ExperienceForm;
