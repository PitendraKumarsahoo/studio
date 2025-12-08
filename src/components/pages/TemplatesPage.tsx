"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { getPlaceholderImage } from '@/lib/placeholder-images';

type TemplateCategory = 'all' | 'classic' | 'modern' | 'creative';

const TemplatesPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');

  const templates = [
    { id: 'primo', name: 'Primo', category: 'classic', description: 'Clean single-column layout' },
    { id: 'diamond', name: 'Diamond', category: 'modern', description: 'Two-column with sidebar' },
    { id: 'cascade', name: 'Cascade', category: 'creative', description: 'Timeline-style layout' },
    { id: 'concept', name: 'Concept', category: 'modern', description: 'Split-header design' },
    { id: 'muse', name: 'Muse', category: 'creative', description: 'Creative and artistic' },
    { id: 'iconic', name: 'Iconic', category: 'classic', description: 'Corporate professional' },
    { id: 'influx', name: 'Influx', category: 'modern', description: 'Bold stripe accent' },
    { id: 'modern', name: 'Modern', category: 'modern', description: 'Clean and minimal' },
    { id: 'minimo', name: 'Minimo', category: 'classic', description: 'Minimalist design' },
    { id: 'primo-blue', name: 'Primo Blue', category: 'classic', description: 'Primo with blue accent' },
    { id: 'diamond-green', name: 'Diamond Green', category: 'modern', description: 'Diamond with green theme' },
    { id: 'cascade-purple', name: 'Cascade Purple', category: 'creative', description: 'Cascade with purple' },
    { id: 'concept-teal', name: 'Concept Teal', category: 'modern', description: 'Concept with teal' },
    { id: 'muse-coral', name: 'Muse Coral', category: 'creative', description: 'Muse with coral accent' },
    { id: 'iconic-navy', name: 'Iconic Navy', category: 'classic', description: 'Iconic with navy' },
    { id: 'influx-red', name: 'Influx Red', category: 'modern', description: 'Influx with red stripe' },
    { id: 'modern-gray', name: 'Modern Gray', category: 'modern', description: 'Modern with gray tones' },
    { id: 'minimo-black', name: 'Minimo Black', category: 'classic', description: 'Minimo with black' },
  ];

  const categories: { id: TemplateCategory, label: string }[] = [
    { id: 'all', label: 'All Templates' },
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' },
  ];
  
  const templatePreviewImage = getPlaceholderImage('template-preview');

  const filteredTemplates = selectedCategory === 'all' ? templates : templates.filter(t => t.category === selectedCategory);

  const handlePreview = (templateName: string) => {
    toast({
      title: '🚧 Feature In Progress',
      description: `Live preview for ${templateName} is not yet available here. You can see it in the builder!`,
      duration: 3000,
    });
  };

  const handleUseTemplate = (templateId: string) => {
    router.push(`/builder?template=${templateId}`);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold mb-4">Resume Templates</h1>
            <p className="text-xl text-foreground/80">Choose from 18+ professionally designed, ATS-optimized templates</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button key={category.id} onClick={() => setSelectedCategory(category.id)} variant={selectedCategory === category.id ? 'default' : 'outline'} className={selectedCategory === category.id ? 'bg-primary text-primary-foreground' : ''}>
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, index) => (
              <motion.div key={template.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.05 }} className="bg-card rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
                <div className="relative aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <Image className="w-full h-full object-cover" alt={`${template.name} resume template preview`} src={templatePreviewImage.imageUrl} width={templatePreviewImage.width} height={templatePreviewImage.height} data-ai-hint={templatePreviewImage.imageHint} />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button onClick={() => handlePreview(template.name)} variant="outline" className="bg-white/90 hover:bg-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold mb-2">{template.name}</h3>
                  <p className="text-muted-foreground mb-4">{template.description}</p>
                  <Button onClick={() => handleUseTemplate(template.id)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Use This Template
                  </Button>
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
