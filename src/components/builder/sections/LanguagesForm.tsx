"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Language = {
  id: number;
  name: string;
  proficiency: string;
};

type ResumeData = {
  languages: Language[];
};

interface LanguagesFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ resumeData, setResumeData }) => {
  const proficiencies = ['Native', 'Fluent', 'Conversational', 'Basic'];

  const addLanguage = () => {
    setResumeData((prev: any) => ({
      ...prev,
      languages: [...(prev.languages || []), { id: Date.now(), name: '', proficiency: 'Fluent' }]
    }));
  };

  const updateLanguage = (id: number, field: keyof Language, value: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      languages: prev.languages.map((lang: Language) => lang.id === id ? { ...lang, [field]: value } : lang)
    }));
  };

  const removeLanguage = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      languages: prev.languages.filter((lang: Language) => lang.id !== id)
    }));
  };

  return (
    <TabsContent value="languages" className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Languages</h3>
        <Button onClick={addLanguage} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Language
        </Button>
      </div>

      {(resumeData.languages || []).length === 0 && (
        <p className="text-muted-foreground text-center py-8">No languages added yet.</p>
      )}

      {(resumeData.languages || []).map((lang) => (
        <div key={lang.id} className="p-4 border border-border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold pt-1">Language</h4>
            <Button onClick={() => removeLanguage(lang.id)} size="icon" variant="ghost">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Language</Label>
              <Input value={lang.name} onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)} placeholder="e.g., Spanish" />
            </div>
            <div>
              <Label>Proficiency</Label>
              <Select value={lang.proficiency} onValueChange={(value) => updateLanguage(lang.id, 'proficiency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencies.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default LanguagesForm;
