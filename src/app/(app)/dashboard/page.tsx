"use client";

import { useState, useEffect, useCallback } from 'react';
import { provideContextualEmotionalSupport, ProvideContextualEmotionalSupportOutput } from '@/ai/flows/provide-contextual-emotional-support';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Brain, Heart, CheckCircle, Lock, ShieldCheck, DatabaseZap, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SimulationStep = {
  text: string;
  description: string;
  icon: React.ReactNode;
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
    { text: 'Encrypt Data', description: 'Your personal data is encrypted on your device before transmission, ensuring only you can access it.', icon: <ShieldCheck className="h-5 w-5" />, status: 'pending' },
    { text: 'Store on IPFS', description: 'The encrypted data is stored on the InterPlanetary File System (IPFS), a decentralized network, not on a central server.', icon: <DatabaseZap className="h-5 w-5" />, status: 'pending' },
    { text: 'Mint Wellness Token', description: 'A "Wellness Token" is minted on the Polygon blockchain as a verifiable and rewarding proof of your check-in.', icon: <Star className="h-5 w-5" />, status: 'pending' },
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
        }, 1500); // Increased delay for better visualization
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
              <CardTitle className="flex items-center gap-2"><Lock size={20}/> Your Data, Your Control: A Web3 Simulation</CardTitle>
              <CardDescription>We respect your privacy. This simulation shows how your data could be handled decentrally.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {simulationSteps.map((step, index) => (
                  <div key={index} className="flex-1 flex gap-4 items-start">
                    <div className="flex flex-col items-center gap-2">
                       <div className={`flex items-center justify-center h-10 w-10 rounded-full ${step.status === 'done' ? 'bg-green-500/20 text-green-500' : 'bg-accent/20 text-accent'}`}>
                        {step.status === 'pending' && <div className="h-5 w-5 text-muted-foreground">{step.icon}</div>}
                        {step.status === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
                        {step.status === 'done' && <CheckCircle className="h-5 w-5" />}
                       </div>
                       {index < simulationSteps.length - 1 && (
                          <div className={`flex-1 w-px h-full ${step.status === 'done' ? 'bg-green-500' : 'bg-border'}`} />
                       )}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p className={`font-semibold ${step.status === 'done' ? 'text-foreground' : 'text-muted-foreground'}`}>{step.text}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </main>
  );
}
