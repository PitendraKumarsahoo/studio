"use client";
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type PersonalInfo = {
  fullName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  photo?: string; // Data URI for the photo
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePersonalInfoChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <TabsContent value="personal" className="p-6 space-y-4">
       <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={resumeData.personalInfo.photo} alt={resumeData.personalInfo.fullName} />
          <AvatarFallback>{(resumeData.personalInfo.fullName || 'YN').slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <Label>Profile Photo</Label>
           <Input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
          <Button asChild variant="outline">
            <Label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Label>
          </Button>
          <p className="text-xs text-muted-foreground">Recommended: Square image, under 1MB</p>
        </div>
      </div>
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
