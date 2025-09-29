'use server';
/**
 * @fileOverview An AI agent that provides contextual emotional support based on user input.
 *
 * - provideContextualEmotionalSupport - A function that analyzes user input and provides personalized responses.
 * - ProvideContextualEmotionalSupportInput - The input type for the provideContextualEmotionalSupport function.
 * - ProvideContextualEmotionalSupportOutput - The return type for the provideContextualEmotionalSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideContextualEmotionalSupportInputSchema = z.object({
  textInput: z.string().describe('The user provided text input.'),
  voiceInputDataUri: z
    .string()
    .optional()
    .describe(
      "The user provided voice input as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ProvideContextualEmotionalSupportInput = z.infer<
  typeof ProvideContextualEmotionalSupportInputSchema
>;

const ProvideContextualEmotionalSupportOutputSchema = z.object({
  emotionalState: z.string().describe('The detected emotional state of the user.'),
  personalizedResponse: z.string().describe('A personalized response to the user.'),
  copingExercise: z.string().describe('A suggested coping exercise for the user.'),
});
export type ProvideContextualEmotionalSupportOutput = z.infer<
  typeof ProvideContextualEmotionalSupportOutputSchema
>;

export async function provideContextualEmotionalSupport(
  input: ProvideContextualEmotionalSupportInput
): Promise<ProvideContextualEmotionalSupportOutput> {
  return provideContextualEmotionalSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideContextualEmotionalSupportPrompt',
  input: {schema: ProvideContextualEmotionalSupportInputSchema},
  output: {schema: ProvideContextualEmotionalSupportOutputSchema},
  prompt: `You are an AI mental health support assistant. Your goal is to analyze user input and provide contextual, personalized responses and coping exercises.

Analyze the following text input:
{{textInput}}

{{#if voiceInputDataUri}}
Also analyze the following voice input:
{{media url=voiceInputDataUri}}
{{/if}}

Based on the text and voice input, determine the user's emotional state and provide a personalized response and a coping exercise.

Emotional State:

Personalized Response:

Coping Exercise:`,
});

const provideContextualEmotionalSupportFlow = ai.defineFlow(
  {
    name: 'provideContextualEmotionalSupportFlow',
    inputSchema: ProvideContextualEmotionalSupportInputSchema,
    outputSchema: ProvideContextualEmotionalSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
