"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const FAQsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: 'Getting Started',
      questions: [
        { question: 'How do I create my first resume?', answer: 'Click "Build My Resume" from the homepage, choose a template, and start filling in your information. Our step-by-step builder guides you through each section including personal info, summary, experience, education, and skills.' },
        { question: 'Do I need to create an account?', answer: 'No account is needed to get started! Your resume is automatically saved in your browser\'s local storage. However, we recommend upgrading to Pro for cloud storage and access from multiple devices.' },
        { question: 'Can I switch templates after I start?', answer: 'Yes! You can switch templates at any time in the builder. Your content will automatically adapt to the new template layout.' },
      ],
    },
    {
      category: 'Features & Tools',
      questions: [
        { question: 'What is the AI Content Generator?', answer: 'Our AI Content Generator uses advanced AI to help you write professional summaries, experience descriptions, and suggest relevant skills based on your role and industry. It\'s available with Pro plans.' },
        { question: 'How does the ATS Checker work?', answer: 'The ATS Checker analyzes your resume for compatibility with Applicant Tracking Systems. It checks formatting, keywords, structure, and provides actionable suggestions to improve your ATS score.' },
        { question: 'Can I customize colors and fonts?', answer: 'Yes! Pro users can customize template colors to match their personal brand. All templates use professional fonts optimized for ATS compatibility.' },
      ],
    },
    {
      category: 'Pricing & Plans',
      questions: [
        { question: 'What\'s included in the Free plan?', answer: 'The Free plan includes 1 resume, 3 basic templates, and PDF export. It\'s perfect for trying out our platform and creating a simple resume.' },
        { question: 'What are the benefits of Pro?', answer: 'Pro ($9.99/month) includes unlimited resumes, all 18+ templates, AI content generation, ATS checker, custom colors, and both PDF & DOCX export.' },
        { question: 'How much can I save with the Annual plan?', answer: 'The Annual plan ($79.99/year) saves you 33% compared to monthly billing. It includes everything in Pro plus priority support and exclusive features.' },
        { question: 'Can I cancel my subscription anytime?', answer: 'Yes, you can cancel your subscription at any time. You\'ll retain access to Pro features until the end of your billing period.' },
      ],
    },
    {
      category: 'Export & Download',
      questions: [
        { question: 'What file formats are available?', answer: 'Free users can export to PDF. Pro users can export to both PDF and DOCX (Word) formats, giving you maximum flexibility for different application requirements.' },
        { question: 'Are the exported resumes ATS-friendly?', answer: 'Yes! All our templates are designed to be ATS-compatible, with clean formatting, proper heading hierarchy, and standard fonts that parse correctly in applicant tracking systems.' },
        { question: 'Can I print my resume directly?', answer: 'Yes, you can print directly from the preview or export to PDF first for better control over the final output.' },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        { question: 'My resume isn\'t saving. What should I do?', answer: 'Resumes are saved automatically in your browser. Make sure you\'re not in incognito/private mode and that you haven\'t disabled local storage. Try refreshing the page or using a different browser.' },
        { question: 'Can I access my resume from different devices?', answer: 'With the Free plan, your resume is stored locally in your browser. Pro users get cloud storage, allowing access from any device by signing in.' },
        { question: 'What browsers are supported?', answer: 'ResumeAI works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.' },
        { question: 'How do I contact support?', answer: 'Visit our Contact page to send us a message, or email support@resumeai.com. Pro users receive priority support with faster response times.' },
      ],
    },
  ];

  const allQuestions = faqCategories.flatMap(cat => cat.questions.map(q => ({ ...q, category: cat.category })));

  const filteredQuestions = searchQuery
    ? allQuestions.filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : allQuestions;

  const toggleQuestion = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-foreground/80">Find answers to common questions about ResumeAI</p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input type="text" placeholder="Search questions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-border focus:border-primary" />
            </div>
          </div>

          {searchQuery ? (
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No questions found matching your search.</p>
                </div>
              ) : (
                filteredQuestions.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="bg-card rounded-xl shadow-md overflow-hidden">
                    <button onClick={() => toggleQuestion(index)} className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-secondary transition-colors">
                      <div>
                        <span className="text-xs font-semibold text-primary mb-1 block">{item.category}</span>
                        <span className="font-semibold text-lg">{item.question}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} />
                    </button>
                    {openIndex === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6 pb-5">
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {faqCategories.map((category, catIndex) => (
                <motion.div key={catIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: catIndex * 0.1 }}>
                  <h2 className="font-headline text-2xl font-bold mb-4">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((item, qIndex) => {
                      const globalIndex = allQuestions.findIndex(q => q.question === item.question && q.category === category.category);
                      return (
                        <div key={qIndex} className="bg-card rounded-xl shadow-md overflow-hidden">
                          <button onClick={() => toggleQuestion(globalIndex)} className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-secondary transition-colors">
                            <span className="font-semibold text-lg">{item.question}</span>
                            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openIndex === globalIndex ? 'transform rotate-180' : ''}`} />
                          </button>
                          {openIndex === globalIndex && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6 pb-5">
                              <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-16 bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-primary-foreground text-center">
            <h2 className="font-headline text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 opacity-90">Can't find the answer you're looking for? Our support team is here to help.</p>
            <Button onClick={() => router.push('/contact')} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-3">
              Contact Support
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQsPage;
