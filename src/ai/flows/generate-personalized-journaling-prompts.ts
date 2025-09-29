'use server';
/**
 * @fileOverview A flow for generating personalized journaling prompts based on mood logs and journal history.
 *
 * - generatePersonalizedJournalingPrompts - A function that generates personalized journaling prompts.
 * - GeneratePersonalizedJournalingPromptsInput - The input type for the generatePersonalizedJournalingPrompts function.
 * - GeneratePersonalizedJournalingPromptsOutput - The return type for the generatePersonalizedJournalingPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedJournalingPromptsInputSchema = z.object({
  moodLogs: z
    .string()
    .describe("A string containing the user's mood logs, with each log entry including a timestamp and mood rating."),
  journalHistory: z
    .string()
    .describe("A string containing the user's past journal entries."),
});
export type GeneratePersonalizedJournalingPromptsInput = z.infer<typeof GeneratePersonalizedJournalingPromptsInputSchema>;

const GeneratePersonalizedJournalingPromptsOutputSchema = z.object({
  prompt: z.string().describe('A personalized journaling prompt.'),
});
export type GeneratePersonalizedJournalingPromptsOutput = z.infer<typeof GeneratePersonalizedJournalingPromptsOutputSchema>;

export async function generatePersonalizedJournalingPrompts(
  input: GeneratePersonalizedJournalingPromptsInput
): Promise<GeneratePersonalizedJournalingPromptsOutput> {
  return generatePersonalizedJournalingPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedJournalingPromptsPrompt',
  input: {schema: GeneratePersonalizedJournalingPromptsInputSchema},
  output: {schema: GeneratePersonalizedJournalingPromptsOutputSchema},
  prompt: `You are an AI journaling assistant. Your task is to provide the user with a personalized journaling prompt based on their recent mood logs and journal history.

  Mood Logs: {{{moodLogs}}}
  Journal History: {{{journalHistory}}}

  Consider the user's emotional patterns, recurring themes, and any expressed concerns or goals. Generate a prompt that encourages self-reflection, exploration of emotions, and identification of coping mechanisms.
  Keep the prompt concise and focused. The goal is to provide a focused question that triggers deep though about the user's mental wellbeing.
  Do not start with "Here is your prompt..."
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  },
});

const generatePersonalizedJournalingPromptsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedJournalingPromptsFlow',
    inputSchema: GeneratePersonalizedJournalingPromptsInputSchema,
    outputSchema: GeneratePersonalizedJournalingPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
