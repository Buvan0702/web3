"use client";

import { useState, useEffect } from 'react';
import { provideContextualEmotionalSupport, ProvideContextualEmotionalSupportOutput } from '@/ai/flows/provide-contextual-emotional-support';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Brain, Heart, CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCallback } from 'react';

type SimulationStep = {
  text: string;
  status: 'pending' | 'loading' | 'done';
};

export default function DashboardPage() {
  const { addWellnessTokens } = useAppContext();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<ProvideContextualEmotionalSupportOutput | null>(null);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>([]);

  const initialSimulationSteps: SimulationStep[] = [
    { text: 'Encrypting interaction data...', status: 'pending' },
    { text: 'Storing on decentralized network (IPFS)...', status: 'pending' },
    { text: 'Minting Wellness Token on Polygon...', status: 'pending' },
  ];

  const memoizedAddWellnessTokens = useCallback(addWellnessTokens, [addWellnessTokens]);
  const memoizedToast = useCallback(toast, [toast]);


  useEffect(() => {
    if (simulationSteps.length > 0 && simulationSteps.some(s => s.status === 'loading')) {
      const currentIndex = simulationSteps.findIndex(s => s.status === 'loading');
      if (currentIndex !== -1) {
        const timer = setTimeout(() => {
          setSimulationSteps(prevSteps => {
            const newSteps = [...prevSteps];
            newSteps[currentIndex].status = 'done';
            if (currentIndex < newSteps.length - 1) {
              newSteps[currentIndex + 1].status = 'loading';
            } else {
              // All steps are done
              memoizedAddWellnessTokens(1);
              memoizedToast({
                title: 'Success!',
                description: 'You earned 1 Wellness Token for checking in.',
              });
            }
            return newSteps;
          });
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [simulationSteps, memoizedAddWellnessTokens, memoizedToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setAiResponse(null);
    setSimulationSteps([]);

    try {
      const response = await provideContextualEmotionalSupport({ textInput: input });
      setAiResponse(response);
      
      // Start simulation
      const steps = [...initialSimulationSteps];
      steps[0].status = 'loading';
      setSimulationSteps(steps);

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get a response from the AI. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Your AI Mental Health Twin</CardTitle>
            <CardDescription>How are you feeling today? Share your thoughts to get personalized support.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Textarea
                placeholder="Tell me what's on your mind..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                disabled={isLoading}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {aiResponse && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Detected Emotion</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{aiResponse.emotionalState}</div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Personalized Response</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{aiResponse.personalizedResponse}</p>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Suggested Coping Exercise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{aiResponse.copingExercise}</p>
              </CardContent>
            </Card>
          </>
        )}
        
        {simulationSteps.length > 0 && (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock size={20}/> Decentralized & Secure</CardTitle>
              <CardDescription>We respect your privacy. Your data is encrypted and stored decentrally.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {simulationSteps.map((step, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {step.status === 'pending' && <Loader2 className="h-5 w-5 text-muted-foreground animate-pulse" />}
                    {step.status === 'loading' && <Loader2 className="h-5 w-5 text-accent animate-spin" />}
                    {step.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    <span className={step.status === 'done' ? 'text-muted-foreground line-through' : ''}>
                      {step.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

      </div>
    </main>
  );
}
