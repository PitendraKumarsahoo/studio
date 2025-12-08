"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TemplateSelector from '@/components/builder/TemplateSelector';
import ResumePreview from '@/components/builder/ResumePreview';
import ColorPicker from '@/components/builder/ColorPicker';
import { exportToPDF, exportToDOCX } from '@/lib/exporter';
import PersonalInfoForm from '@/components/builder/sections/PersonalInfoForm';
import SummaryForm from '@/components/builder/sections/SummaryForm';
import ExperienceForm from '@/components/builder/sections/ExperienceForm';
import EducationForm from '@/components/builder/sections/EducationForm';
import SkillsForm from '@/components/builder/sections/SkillsForm';
import { useSearchParams } from 'next/navigation';

const initialResumeData = {
  personalInfo: { fullName: 'Your Name', jobTitle: 'Professional Title', email: '', phone: '', location: '', website: '', linkedin: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

const ResumeBuilderPage = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  const getTemplateFromURL = () => searchParams.get('template') || 'primo';

  const [selectedTemplate, setSelectedTemplate] = useState(getTemplateFromURL());
  const [templateColor, setTemplateColor] = useState('#3F51B5');
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [isClient, setIsClient] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        setResumeData(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error parsing resume data from localStorage", error);
      setResumeData(initialResumeData);
    }
  }, []);

  useEffect(() => {
    setSelectedTemplate(getTemplateFromURL());
  }, [searchParams]);

  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resumeData, isClient]);

  const handleExportPDF = async () => {
    toast({ title: '📄 Generating PDF...', description: 'Your resume will be downloaded shortly.' });
    if (!previewRef.current) {
      toast({ title: '❌ Export Failed', description: 'Preview element not found.', variant: 'destructive' });
      return;
    }
    try {
      await exportToPDF(previewRef.current, resumeData.personalInfo.fullName);
      toast({ title: '✅ PDF Exported!', description: 'Your resume has been successfully exported as a PDF.', duration: 3000 });
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast({ title: '❌ Export Failed', description: 'There was an error generating the PDF.', variant: 'destructive', duration: 3000 });
    }
  };

  const handleExportDOCX = async () => {
    toast({ title: '📄 Generating DOCX...', description: 'Your resume will be downloaded shortly.' });
    try {
      await exportToDOCX(resumeData);
      toast({ title: '✅ DOCX Exported!', description: 'Your resume has been successfully exported as a DOCX file.', duration: 3000 });
    } catch (error) {
      console.error("DOCX Export Error:", error);
      toast({ title: '❌ Export Failed', description: 'There was an error generating the DOCX file.', variant: 'destructive', duration: 3000 });
    }
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast({ title: '✅ Resume Saved!', description: 'Your resume has been saved to your browser.', duration: 3000 });
  };
  
  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <div className="py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold mb-2">Resume Builder</h1>
          <p className="text-muted-foreground">Create your professional resume with AI assistance</p>
        </div>

        <Tabs defaultValue="personal" className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headline text-xl font-bold">Template & Style</h2>
                <Button onClick={handleSave} variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
              <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
              <div className="mt-4">
                <ColorPicker color={templateColor} onColorChange={setTemplateColor} />
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-sm">
              <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 p-1 h-auto">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />
              <SummaryForm resumeData={resumeData} setResumeData={setResumeData} />
              <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />
              <EducationForm resumeData={resumeData} setResumeData={setResumeData} />
              <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:sticky lg:top-24 space-y-4" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <div className="bg-card rounded-lg shadow-sm p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h3 className="font-headline font-semibold">Live Preview</h3>
                <div className="flex gap-2">
                  <Button onClick={handleExportPDF} size="sm" variant="outline"><Download className="w-4 h-4 mr-2" />PDF</Button>
                  <Button onClick={handleExportDOCX} size="sm" variant="outline"><Download className="w-4 h-4 mr-2" />DOCX</Button>
                </div>
              </div>
              <div className="overflow-auto flex-grow bg-gray-200/50 rounded-md p-4 flex justify-center">
                <div ref={previewRef} className="transform scale-[0.35] sm:scale-[0.5] md:scale-[0.4] lg:scale-[0.5] xl:scale-[0.6] origin-top">
                  <ResumePreview template={selectedTemplate} color={templateColor} data={resumeData} />
                </div>
              </div>
            </div>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
