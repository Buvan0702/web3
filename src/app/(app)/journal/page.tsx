"use client";

import { useState } from 'react';
import { generatePersonalizedJournalingPrompts } from '@/ai/flows/generate-personalized-journaling-prompts';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, BookHeart, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function JournalPage() {
  const { journalEntries, moodLogs, addJournalEntry, addWellnessTokens } = useAppContext();
  const { toast } = useToast();
  
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');

  const handleGeneratePrompt = async () => {
    setIsLoadingPrompt(true);
    setPrompt('');

    try {
      const moodLogsString = moodLogs.map(log => `${log.timestamp.toISOString()}: ${log.mood}`).join('\n');
      const journalHistoryString = journalEntries.map(entry => `${entry.timestamp.toISOString()}:\n${entry.content}`).join('\n\n');

      const response = await generatePersonalizedJournalingPrompts({
        moodLogs: moodLogsString || 'No mood logs yet.',
        journalHistory: journalHistoryString || 'No journal entries yet.',
      });
      setPrompt(response.prompt);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to generate a prompt. Please try again.",
      });
    } finally {
      setIsLoadingPrompt(false);
    }
  };
  
  const handleSaveEntry = () => {
    if (!newEntryContent.trim()) {
      toast({
        variant: "destructive",
        title: "Empty Entry",
        description: "You can't save an empty journal entry.",
      });
      return;
    }

    addJournalEntry({
      id: new Date().toISOString(),
      prompt: prompt || "Freewriting",
      content: newEntryContent,
      timestamp: new Date(),
    });

    addWellnessTokens(2);
    toast({
      title: "Entry Saved!",
      description: "You've earned 2 Wellness Tokens for journaling.",
    });

    setNewEntryContent('');
    setPrompt('');
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">My Journal</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>New Journal Entry</CardTitle>
          <CardDescription>Reflect on your thoughts and feelings. Start by generating a prompt or just write freely.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGeneratePrompt} disabled={isLoadingPrompt}>
            {isLoadingPrompt ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Prompt...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get a Personalized Prompt
              </>
            )}
          </Button>

          {(prompt || isLoadingPrompt) && (
             <Card className="bg-muted/50">
               <CardContent className="p-4">
                {isLoadingPrompt ? <p className="text-sm text-muted-foreground animate-pulse">Your prompt is being generated...</p> : 
                <blockquote className="border-l-2 pl-4 italic text-foreground">
                  {prompt}
                </blockquote>
                }
               </CardContent>
             </Card>
          )}

          <Textarea
            placeholder="Write your thoughts here..."
            value={newEntryContent}
            onChange={(e) => setNewEntryContent(e.target.value)}
            rows={8}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveEntry} disabled={!newEntryContent}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <h2 className="font-semibold text-lg md:text-xl mb-4">Past Entries</h2>
        {journalEntries.length > 0 ? (
          <div className="space-y-4">
            {journalEntries.map(entry => (
              <Card key={entry.id}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookHeart className="h-5 w-5 text-accent" />
                    {entry.prompt}
                  </CardTitle>
                  <CardDescription>
                    {format(entry.timestamp, 'MMMM d, yyyy \'at\' h:mm a')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">You haven't written any journal entries yet.</p>
        )}
      </div>
    </main>
  );
}
