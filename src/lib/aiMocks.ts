export const checkATSScore = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const score = Math.floor(Math.random() * 30) + 70;
  
  const details = [
    { 
      status: 'pass' as const, 
      title: 'Contact Information', 
      description: 'All essential contact details are present and properly formatted.' 
    },
    { 
      status: score >= 80 ? 'pass' as const : 'warning' as const, 
      title: 'Resume Format', 
      description: score >= 80 ? 'Format is clean and ATS-friendly.' : 'Consider simplifying your format for better ATS compatibility.' 
    },
    { 
      status: score >= 85 ? 'pass' as const : 'warning' as const, 
      title: 'Keywords', 
      description: score >= 85 ? 'Good keyword density for your industry.' : 'Add more relevant keywords from job descriptions.' 
    },
    { 
      status: 'pass' as const, 
      title: 'Section Headers', 
      description: 'Standard section headers are used and properly labeled.' 
    },
    { 
      status: score >= 75 ? 'pass' as const : 'fail' as const, 
      title: 'Work Experience', 
      description: score >= 75 ? 'Work experience is well-structured with dates.' : 'Add more detail to your work experience section.' 
    },
  ];
  
  const passedChecks = details.filter(d => d.status === 'pass').length;
  const warnings = details.filter(d => d.status === 'warning').length;
  const issues = details.filter(d => d.status === 'fail').length;
  
  return {
    score,
    message: score >= 80 
      ? 'Excellent! Your resume is well-optimized for ATS systems.' 
      : score >= 70 
        ? 'Good, but there\'s room for improvement.'
        : 'Your resume needs significant optimization for ATS compatibility.',
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
  ];
  
  return keywords.sort(() => Math.random() - 0.5).slice(0, 8);
};
