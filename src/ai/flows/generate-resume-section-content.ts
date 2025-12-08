'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating content for resume sections using AI.
 *
 * The flow uses a prompt to generate content based on the provided section type and user input.
 *
 * @interface GenerateResumeSectionContentInput - Input for the generateResumeSectionContent function.
 * @interface GenerateResumeSectionContentOutput - Output of the generateResumeSectionContent function.
 * @function generateResumeSectionContent - The main function to generate resume section content.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeSectionContentInputSchema = z.object({
  sectionType: z
    .enum(['summary', 'skills', 'experience', 'project'])
    .describe('The type of resume section to generate content for.'),
  userInput: z
    .string()
    .describe('User input to guide the content generation.'),
});

export type GenerateResumeSectionContentInput = z.infer<
  typeof GenerateResumeSectionContentInputSchema
>;

const GenerateResumeSectionContentOutputSchema = z.object({
  content: z.string().describe('The generated content for the resume section.'),
});

export type GenerateResumeSectionContentOutput = z.infer<
  typeof GenerateResumeSectionContentOutputSchema
>;

export async function generateResumeSectionContent(
  input: GenerateResumeSectionContentInput
): Promise<GenerateResumeSectionContentOutput> {
  return generateResumeSectionContentFlow(input);
}

const resumeSectionContentPrompt = ai.definePrompt({
  name: 'resumeSectionContentPrompt',
  input: {schema: GenerateResumeSectionContentInputSchema},
  output: {schema: GenerateResumeSectionContentOutputSchema},
  prompt: `You are an AI assistant designed to help users write their resume.

  The user wants to generate content for the following section type: {{{sectionType}}}
  The user has provided the following input to guide the content generation: {{{userInput}}}

  Please generate content that is professional, compelling, and effective for the given resume section type and user input.
  Make sure to follow these constraints:
  - Use short sentences and action verbs.
  - Focus on achievements and quantifiable results.
  - Tailor content to match desired job or industry.
  - Be concise.

  Content:`,
});

const generateResumeSectionContentFlow = ai.defineFlow(
  {
    name: 'generateResumeSectionContentFlow',
    inputSchema: GenerateResumeSectionContentInputSchema,
    outputSchema: GenerateResumeSectionContentOutputSchema,
  },
  async input => {
    const {output} = await resumeSectionContentPrompt(input);
    return {content: output!.content!};
  }
);
