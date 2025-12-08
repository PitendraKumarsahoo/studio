export const checkATSScore = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const score = Math.floor(Math.random() * 55) + 40; // New score range: 40-95

  const passedChecks = Math.floor(score / 20);
  const warnings = Math.floor((100 - score) / 15);
  const issues = 5 - passedChecks - warnings > 0 ? 5 - passedChecks - warnings : 0;
  
  const details = [
    { 
      status: 'pass' as const, 
      title: 'Contact Information', 
      description: 'Your contact information is clear and well-formatted for ATS parsers.' 
    },
    { 
      status: score >= 80 ? 'pass' as const : 'warning' as const, 
      title: 'File Format & Readability', 
      description: score >= 80 ? 'Your resume file format is perfectly readable by ATS.' : 'Consider exporting as a .docx for maximum compatibility, as some older ATS have trouble with PDF layouts.' 
    },
    { 
      status: score >= 85 ? 'pass' as const : (score >= 60 ? 'warning' as const : 'fail' as const), 
      title: 'Keyword Optimization', 
      description: score >= 85 ? 'Excellent keyword alignment with industry standards.' : (score >= 60 ? 'Your resume could be enhanced by incorporating more keywords from relevant job descriptions.' : 'Your resume is missing crucial keywords that help you get noticed. Tailor your skills to the job description.')
    },
    { 
      status: 'pass' as const, 
      title: 'Section Headers', 
      description: 'Standard section headers (e.g., "Experience", "Education") are used, which is great for ATS scanning.' 
    },
    { 
      status: score >= 75 ? 'pass' as const : 'fail' as const, 
      title: 'Job Experience Formatting', 
      description: score >= 75 ? 'Your work experience is clearly structured with dates and scannable bullet points.' : 'Your work experience section lacks clear dates or quantifiable achievements, which can confuse an ATS.' 
    },
  ];
  
  return {
    score,
    message: score >= 85
      ? 'Excellent! Your resume is highly optimized for modern ATS.' 
      : score >= 65
        ? 'Good score! Your resume is ATS-friendly, but a few tweaks could make it even better.'
        : 'Your resume needs optimization to ensure it passes through Applicant Tracking Systems effectively.',
    passedChecks,
    warnings,
    issues,
    details,
  };
};

export const suggestKeywords = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const keywords = [
    'Project Management',
    'Leadership',
    'Strategic Planning',
    'Data Analysis',
    'Team Collaboration',
    'Problem Solving',
    'Communication',
    'Process Improvement',
    'Budget Management',
    'Stakeholder Management',
    'Agile Methodology',
    'Cross-functional',
    'Customer Relationship Management (CRM)',
    'Software Development Life Cycle (SDLC)',
    'Go-to-market Strategy',
    'Product Roadmap',
  ];
  
  return keywords.sort(() => Math.random() - 0.5).slice(0, 10);
};
