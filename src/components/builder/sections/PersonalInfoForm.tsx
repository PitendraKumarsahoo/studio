"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PersonalInfo = {
  fullName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
};

interface PersonalInfoFormProps {
  resumeData: { personalInfo: PersonalInfo };
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ resumeData, setResumeData }) => {
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  return (
    <TabsContent value="personal" className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={resumeData.personalInfo.fullName || ''}
            onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={resumeData.personalInfo.jobTitle || ''}
            onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
            placeholder="e.g. Software Engineer"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={resumeData.personalInfo.email || ''}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={resumeData.personalInfo.phone || ''}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={resumeData.personalInfo.location || ''}
          onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
          placeholder="New York, NY"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={resumeData.personalInfo.website || ''}
            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
            placeholder="www.johndoe.com"
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={resumeData.personalInfo.linkedin || ''}
            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default PersonalInfoForm;
