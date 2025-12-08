"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import ResumePreview from '@/components/builder/ResumePreview';

type TemplateCategory = 'all' | 'classic' | 'modern' | 'creative';

const initialResumeData = {
  personalInfo: {
    fullName: 'John Smith',
    jobTitle: 'Senior Sales Associate',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/johnsmith',
    website: 'johnsmith.dev',
    photo: '',
  },
  summary: 'Highly motivated Sales Associate with extensive customer service and sales experience. Surpassing sales goals with a proven track record of driving revenue growth and improving buying experiences.',
  experience: [
    { id: 1, position: 'Senior Sales Associate', company: 'Tech Solutions Inc.', startDate: '2022-01', endDate: '', current: true, description: '• Exceeded sales targets by 20% for three consecutive quarters.\n• Mentored and trained junior sales staff.' },
    { id: 2, position: 'Sales Associate', company: 'Retail Goods Co.', startDate: '2019-06', endDate: '2021-12', current: false, description: '• Achieved top 5% in regional sales performance.\n• Resolved customer issues with a 98% satisfaction rate.' },
  ],
  education: [
    { id: 1, school: 'State University', degree: 'B.A. in Business Administration', field: 'Marketing', startDate: '2015-08', endDate: '2019-05', current: false },
  ],
  skills: [
    { id: 1, name: 'CRM Software' },
    { id: 2, name: 'Salesforce' },
    { id: 3, name: 'Negotiation' },
    { id: 4, name: 'Lead Generation' },
  ],
  projects: [],
  certifications: [],
  languages: [],
};


const TemplatesPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');

  const templates = [
    { id: 'primo', name: 'Primo', category: 'classic', description: 'Clean single-column layout', color: '#3F51B5' },
    { id: 'diamond', name: 'Diamond', category: 'modern', description: 'Two-column with sidebar', color: '#009688' },
    { id: 'cascade', name: 'Cascade', category: 'creative', description: 'Timeline-style layout', color: '#8B5CF6' },
    { id: 'concept', name: 'Concept', category: 'modern', description: 'Split-header design', color: '#EF4444' },
    { id: 'muse', name: 'Muse', category: 'creative', description: 'Creative and artistic', color: '#F59E0B' },
    { id: 'iconic', name: 'Iconic', category: 'classic', description: 'Corporate professional', color: '#6366F1' },
    { id: 'influx', name: 'Influx', category: 'modern', description: 'Bold stripe accent', color: '#10B981' },
    { id: 'modern', name: 'Modern', category: 'modern', description: 'Clean and minimal', color: '#FF7A59' },
    { id: 'minimo', name: 'Minimo', category: 'classic', description: 'Minimalist design', color: '#374151' },
    { id: 'academic', name: 'Academic', category: 'classic', description: 'Traditional CV style', color: '#1F2937'},
    { id: 'primo-blue', name: 'Primo Blue', category: 'classic', description: 'Primo with blue accent', color: '#2563EB' },
    { id: 'diamond-green', name: 'Diamond Green', category: 'modern', description: 'Diamond with green theme', color: '#10B981' },
    { id: 'cascade-purple', name: 'Cascade Purple', category: 'creative', description: 'Cascade with purple', color: '#8B5CF6' },
    { id: 'concept-teal', name: 'Concept Teal', category: 'modern', description: 'Concept with teal', color: '#14B8A6' },
    { id: 'muse-coral', name: 'Muse Coral', category: 'creative', description: 'Muse with coral accent', color: '#FF7A59' },
    { id: 'iconic-navy', name: 'Iconic Navy', category: 'classic', description: 'Iconic with navy', color: '#1E3A8A' },
    { id: 'influx-red', name: 'Influx Red', category: 'modern', description: 'Influx with red stripe', color: '#DC2626' },
    { id: 'modern-gray', name: 'Modern Gray', category: 'modern', description: 'Modern with gray tones', color: '#4B5563' },
    { id: 'minimo-black', name: 'Minimo Black', category: 'classic', description: 'Minimo with black', color: '#000000' },
  ];

  const categories: { id: TemplateCategory, label: string }[] = [
    { id: 'all', label: 'All Templates' },
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' },
  ];

  const filteredTemplates = selectedCategory === 'all' ? templates : templates.filter(t => t.category === selectedCategory);

  const handleUseTemplate = (templateId: string) => {
    router.push(`/builder?template=${templateId}`);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold mb-4">Pick a CV template</h1>
            <p className="text-xl text-foreground/80">Choose from 18+ professionally designed, ATS-optimized templates</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button key={category.id} onClick={() => setSelectedCategory(category.id)} variant={selectedCategory === category.id ? 'default' : 'outline'} className={selectedCategory === category.id ? 'bg-primary text-primary-foreground' : ''}>
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTemplates.map((template, index) => (
              <motion.div 
                key={template.id} 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.05 }} 
                className="bg-card rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div 
                  className="relative aspect-[8.5/11] bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => handleUseTemplate(template.id)}
                >
                  <div className="absolute inset-0 transform scale-[0.19] sm:scale-[0.25] origin-top-left">
                     <ResumePreview template={template.id} color={template.color} data={initialResumeData} />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className='text-white flex items-center gap-2 font-semibold'>
                      <Check className='w-5 h-5'/>
                      Use Template
                    </div>
                  </div>
                </div>
                <div className="p-4 mt-auto">
                  <h3 className="font-headline text-lg font-bold">{template.name}</h3>
                  <p className="text-muted-foreground text-sm">{template.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplatesPage;
