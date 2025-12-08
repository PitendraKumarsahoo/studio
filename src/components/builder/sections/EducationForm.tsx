"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

type Education = {
  id: number;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
};

type ResumeData = {
  education: Education[];
};

interface EducationFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const EducationForm: React.FC<EducationFormProps> = ({ resumeData, setResumeData }) => {
  const addEducation = () => {
    setResumeData((prev: any) => ({
      ...prev,
      education: [...(prev.education || []), { id: Date.now(), school: '', degree: '', field: '', startDate: '', endDate: '', current: false }]
    }));
  };

  const updateEducation = (id: number, field: keyof Education, value: string | boolean) => {
    setResumeData((prev: any) => ({
      ...prev,
      education: prev.education.map((edu: Education) => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      education: prev.education.filter((edu: Education) => edu.id !== id)
    }));
  };

  return (
    <TabsContent value="education" className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Education</h3>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {(resumeData.education || []).length === 0 && (
        <p className="text-muted-foreground text-center py-8">No education added yet. Click "Add Education" to start.</p>
      )}

      {(resumeData.education || []).map((edu) => (
        <div key={edu.id} className="p-4 border border-border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold pt-1">Education Entry</h4>
            <Button onClick={() => removeEducation(edu.id)} size="icon" variant="ghost">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div>
            <Label>School/University</Label>
            <Input value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="University Name" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Degree</Label>
              <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor's, Master's, etc." />
            </div>
            <div>
              <Label>Field of Study</Label>
              <Input value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="Computer Science, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} disabled={edu.current} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id={`current-edu-${edu.id}`} checked={edu.current} onCheckedChange={(checked) => updateEducation(edu.id, 'current', checked as boolean)} />
            <Label htmlFor={`current-edu-${edu.id}`} className="font-normal">I currently study here</Label>
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default EducationForm;
