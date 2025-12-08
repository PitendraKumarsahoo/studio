"use client";
import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkATSScore, suggestKeywords } from '@/lib/aiHelpers';
import { useRouter } from 'next/navigation';

type AnalysisDetail = {
  status: 'pass' | 'warning' | 'fail';
  title: string;
  description: string;
};

type AnalysisResults = {
  score: number;
  message: string;
  passedChecks: number;
  warnings: number;
  issues: number;
  details: AnalysisDetail[];
  keywords: string[];
};

const ATSCheckerPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.type === 'application/pdf' || uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(uploadedFile);
        toast({
          title: '✅ File Uploaded',
          description: `${uploadedFile.name} is ready for analysis.`,
        });
      } else {
        toast({
          title: '⚠️ Invalid File Type',
          description: 'Please upload a PDF or DOCX file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: '⚠️ No File',
        description: 'Please upload a resume first.',
        variant: 'destructive',
      });
      return;
    }

    setAnalyzing(true);
    setResults(null);
    toast({
      title: '🔍 Analyzing Resume...',
      description: 'This may take a few moments.',
    });

    const mockResults = await checkATSScore();
    const keywords = await suggestKeywords();

    setResults({
      ...mockResults,
      keywords,
    });

    setAnalyzing(false);
    toast({
      title: '✅ Analysis Complete!',
      description: 'Your ATS score is ready.',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold mb-4">ATS Resume Checker</h1>
            <p className="text-xl text-foreground/80">
              Check if your resume passes Applicant Tracking Systems
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-8 mb-8">
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  {file ? (
                    <>
                      <FileText className="w-16 h-16 text-primary mb-4" />
                      <p className="text-lg font-semibold mb-2">{file.name}</p>
                      <p className="text-muted-foreground mb-4">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-16 h-16 text-muted-foreground mb-4" />
                      <p className="text-lg font-semibold mb-2">Upload Your Resume</p>
                      <p className="text-muted-foreground mb-4">Drag and drop or click to browse</p>
                      <p className="text-sm text-muted-foreground">Supports PDF and DOCX formats</p>
                    </>
                  )}
                </div>
              </label>
            </div>

            <div className="mt-6 text-center">
              <Button
                onClick={handleAnalyze}
                disabled={!file || analyzing}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Resume'}
              </Button>
            </div>
          </div>

          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(results.score)} mb-4`}>
                    <span className={`font-headline text-5xl font-bold ${getScoreColor(results.score)}`}>
                      {results.score}
                    </span>
                  </div>
                  <h2 className="font-headline text-2xl font-bold mb-2">ATS Compatibility Score</h2>
                  <p className="text-muted-foreground">{results.message}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 rounded-lg bg-green-100">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold text-green-900">Passed Checks</p>
                    <p className="font-headline text-3xl font-bold text-green-600">{results.passedChecks}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-yellow-100">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-yellow-900">Warnings</p>
                    <p className="font-headline text-3xl font-bold text-yellow-600">{results.warnings}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-100">
                    <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="font-semibold text-red-900">Issues</p>
                    <p className="font-headline text-3xl font-bold text-red-600">{results.issues}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-headline text-xl font-bold mb-4">Analysis Details</h3>
                  {results.details.map((detail, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 rounded-lg ${
                        detail.status === 'pass'
                          ? 'bg-green-50'
                          : detail.status === 'warning'
                          ? 'bg-yellow-50'
                          : 'bg-red-50'
                      }`}
                    >
                      {detail.status === 'pass' ? (
                        <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                      ) : detail.status === 'warning' ? (
                        <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{detail.title}</p>
                        <p className="text-sm text-muted-foreground">{detail.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-lg p-8">
                <h3 className="font-headline text-xl font-bold mb-4">Suggested Keywords</h3>
                <p className="text-muted-foreground mb-6">
                  Add these keywords to improve your ATS score and match job descriptions better.
                </p>
                <div className="flex flex-wrap gap-3">
                  {results.keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium"
                    >
                      {keyword}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg p-8 text-primary-foreground text-center">
                <h3 className="font-headline text-2xl font-bold mb-4">Want to Improve Your Score?</h3>
                <p className="mb-6 opacity-90">
                  Use our Resume Builder with AI-powered optimization to create an ATS-friendly resume.
                </p>
                <Button
                  onClick={() => router.push('/builder')}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Go to Resume Builder
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ATSCheckerPage;
