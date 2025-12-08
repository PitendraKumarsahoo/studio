'use server';

import { generateResumeSectionContent } from '@/ai/flows/generate-resume-section-content';
import { checkATSScore as mockCheckATSScore, suggestKeywords as mockSuggestKeywords } from './aiMocks';

const formatUserInput = (data: any, context: string): string => {
  // Prune the data to avoid sending too much information
  const relevantData = {
    personalInfo: {
      jobTitle: data.personalInfo?.jobTitle,
    },
    experience: (data.experience || []).map((exp: any) => ({
      position: exp.position,
      company: exp.company,
      description: exp.description?.substring(0, 100) + '...', // Truncate long descriptions
    })),
    skills: (data.skills || []).map((skill: any) => skill.name),
  };
  return `${context}\n\nResume context:\n${JSON.stringify(relevantData, null, 2)}`;
}

export const generateSummaryAI = async (resumeData: any): Promise<string> => {
  try {
    const result = await generateResumeSectionContent({
      sectionType: 'summary',
      userInput: formatUserInput(resumeData, 'Generate a professional summary. The output should be a single paragraph.')
    });
    return result.content;
  } catch (error) {
    console.error("AI Error (Summary):", error);
    return "Failed to generate AI summary. Please try again later.";
  }
};

export const generateSkillsAI = async (resumeData: any): Promise<string[]> => {
  try {
    const result = await generateResumeSectionContent({
      sectionType: 'skills',
      userInput: formatUserInput(resumeData, 'Generate a list of 5 to 10 relevant skills. The output should be a single comma-separated string of skills, e.g., "React, TypeScript, Node.js".')
    });
    return result.content.split(',').map(skill => skill.trim()).filter(Boolean);
  } catch (error) {
    console.error("AI Error (Skills):", error);
    return []; // Return empty array on error
  }
};

export const generateExperienceAI = async (experience: any): Promise<string> => {
  try {
    const result = await generateResumeSectionContent({
      sectionType: 'experience',
      userInput: `Generate a professional experience description for the following role: ${JSON.stringify(experience)}. Use bullet points starting with '•' for achievements.`
    });
    return result.content;
  } catch (error) {
    console.error("AI Error (Experience):", error);
    return "Failed to generate AI description. Please try again later.";
  }
};

export const generateProjectDescriptionAI = async (project: any): Promise<string> => {
  try {
    const result = await generateResumeSectionContent({
      sectionType: 'project',
      userInput: `Generate a professional project description for the following project: ${JSON.stringify(project)}. Use bullet points starting with '•' for key features or achievements.`
    });
    return result.content;
  } catch (error) {
    console.error("AI Error (Project Description):", error);
    return "Failed to generate AI description. Please try again later.";
  }
};


export const checkATSScore = mockCheckATSScore;
export const suggestKeywords = mockSuggestKeywords;
