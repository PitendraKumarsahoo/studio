"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

type Project = {
  id: number;
  name: string;
  description: string;
  link: string;
};

type ResumeData = {
  projects: Project[];
};

interface ProjectsFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ resumeData, setResumeData }) => {
  const addProject = () => {
    setResumeData((prev: any) => ({
      ...prev,
      projects: [...(prev.projects || []), { id: Date.now(), name: '', description: '', link: '' }]
    }));
  };

  const updateProject = (id: number, field: keyof Project, value: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      projects: prev.projects.map((proj: Project) => proj.id === id ? { ...proj, [field]: value } : proj)
    }));
  };

  const removeProject = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      projects: prev.projects.filter((proj: Project) => proj.id !== id)
    }));
  };

  return (
    <TabsContent value="projects" className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Projects</h3>
        <Button onClick={addProject} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {(resumeData.projects || []).length === 0 && (
        <p className="text-muted-foreground text-center py-8">No projects added yet.</p>
      )}

      {(resumeData.projects || []).map((proj) => (
        <div key={proj.id} className="p-4 border border-border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold pt-1">Project</h4>
            <Button onClick={() => removeProject(proj.id)} size="icon" variant="ghost">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div>
            <Label>Project Name</Label>
            <Input value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} placeholder="e.g., Portfolio Website" />
          </div>
          <div>
            <Label>Link</Label>
            <Input value={proj.link} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} placeholder="github.com/user/repo" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} placeholder="Describe the project, your role, and technologies used..." rows={4} />
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default ProjectsForm;
