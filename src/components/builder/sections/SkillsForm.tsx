"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { generateSkillsAI } from '@/lib/aiHelpers';
import { useToast } from '@/hooks/use-toast';

type Skill = {
  id: number;
  name: string;
};

type ResumeData = {
  skills: Skill[];
};

interface SkillsFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ resumeData, setResumeData }) => {
  const { toast } = useToast();

  const addSkill = () => {
    const newSkill = prompt('Enter a skill:');
    if (newSkill && newSkill.trim()) {
      setResumeData((prev: any) => ({
        ...prev,
        skills: [...(prev.skills || []), { id: Date.now(), name: newSkill.trim() }]
      }));
    }
  };

  const removeSkill = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((skill: Skill) => skill.id !== id)
    }));
  };

  const handleGenerateSkills = async () => {
    toast({ title: '✨ Generating Skills...', description: 'AI is suggesting relevant skills' });
    const skills = await generateSkillsAI(resumeData);
    if(skills.length > 0) {
      setResumeData((prev: any) => ({
        ...prev,
        skills: [...(prev.skills || []), ...skills.map((skill, idx) => ({ id: Date.now() + idx, name: skill }))]
      }));
      toast({ title: '✅ Skills Generated!', description: `Added ${skills.length} relevant skills`, duration: 3000 });
    } else {
      toast({ title: '❌ AI Error', description: `Could not generate skills.`, variant: 'destructive', duration: 3000 });
    }
  };

  return (
    <TabsContent value="skills" className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Skills</h3>
        <div className="flex gap-2">
          <Button onClick={handleGenerateSkills} size="sm" variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Skills
          </Button>
          <Button onClick={addSkill} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {(resumeData.skills || []).map((skill) => (
          <div key={skill.id} className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
            <span>{skill.name}</span>
            <button onClick={() => removeSkill(skill.id)} className="hover:text-red-500">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
        {(resumeData.skills || []).length === 0 && (
          <p className="text-muted-foreground w-full text-center py-8">No skills added yet. Click "Add Skill" or "Generate Skills".</p>
        )}
      </div>
    </TabsContent>
  );
};

export default SkillsForm;
