"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

type Certification = {
  id: number;
  name: string;
  authority: string;
  date: string;
};

type ResumeData = {
  certifications: Certification[];
};

interface CertificationsFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ resumeData, setResumeData }) => {
  const addCertification = () => {
    setResumeData((prev: any) => ({
      ...prev,
      certifications: [...(prev.certifications || []), { id: Date.now(), name: '', authority: '', date: '' }]
    }));
  };

  const updateCertification = (id: number, field: keyof Certification, value: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      certifications: prev.certifications.map((cert: Certification) => cert.id === id ? { ...cert, [field]: value } : cert)
    }));
  };

  const removeCertification = (id: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      certifications: prev.certifications.filter((cert: Certification) => cert.id !== id)
    }));
  };

  return (
    <TabsContent value="certifications" className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Certifications</h3>
        <Button onClick={addCertification} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {(resumeData.certifications || []).length === 0 && (
        <p className="text-muted-foreground text-center py-8">No certifications added yet.</p>
      )}

      {(resumeData.certifications || []).map((cert) => (
        <div key={cert.id} className="p-4 border border-border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold pt-1">Certification</h4>
            <Button onClick={() => removeCertification(cert.id)} size="icon" variant="ghost">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          <div>
            <Label>Certification Name</Label>
            <Input value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} placeholder="e.g., Certified ScrumMaster" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <Label>Issuing Authority</Label>
                <Input value={cert.authority} onChange={(e) => updateCertification(cert.id, 'authority', e.target.value)} placeholder="e.g., Scrum Alliance" />
            </div>
            <div>
                <Label>Date Issued</Label>
                <Input type="month" value={cert.date} onChange={(e) => updateCertification(cert.id, 'date', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default CertificationsForm;
