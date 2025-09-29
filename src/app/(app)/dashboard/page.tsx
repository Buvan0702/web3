"use client";

import { useState, useEffect, useCallback } from 'react';
import { provideContextualEmotionalSupport, ProvideContextualEmotionalSupportOutput } from '@/ai/flows/provide-contextual-emotional-support';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Brain, Heart, CheckCircle, Lock, ShieldCheck, DatabaseZap, Star, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SimulationStep = {
  title: string;
  description: string;
  longDescription: string;
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
  const [showSimulation, setShowSimulation] = useState(false);

  const initialSimulationSteps: SimulationStep[] = [
    { 
      title: 'Step 1: On-Device Encryption', 
      description: 'Data is secured on your device.',
      longDescription: 'Your personal data is encrypted on your device using cutting-edge security protocols before it is transmitted. This ensures that only you hold the key, and no one else can access your raw data.',
      icon: <ShieldCheck className="h-8 w-8" />, 
      status: 'pending' 
    },
    { 
      title: 'Step 2: Decentralized Storage', 
      description: 'Stored on a peer-to-peer network.',
      longDescription: 'The encrypted data is stored on the InterPlanetary File System (IPFS), a distributed network of computers. This prevents censorship and control by a single entity, unlike traditional cloud servers.',
      icon: <DatabaseZap className="h-8 w-8" />, 
      status: 'pending' 
    },
    { 
      title: 'Step 3: Proof of Wellness', 
      description: 'A "Wellness Token" is minted.',
      longDescription: 'A non-transferable "Wellness Token" is minted on a blockchain as a verifiable and rewarding proof of your mental health check-in. This creates a secure, immutable record of your wellness journey.',
      icon: <Star className="h-8 w-8" />, 
      status: 'pending' 
    },
  ];

  const stableAddWellnessTokens = useCallback(addWellnessTokens, []);
  const stableToast = useCallback(toast, []);

  const runSimulation = useCallback(() => {
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
              stableAddWellnessTokens(1);
              stableToast({
                title: 'Success!',
                description: 'You earned 1 Wellness Token for checking in.',
              });
            }
            return newSteps;
          });
        }, 2000); 
        return () => clearTimeout(timer);
      }
    }
  }, [simulationSteps, stableAddWellnessTokens, stableToast]);

  useEffect(() => {
    runSimulation();
  }, [runSimulation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setAiResponse(null);
    setSimulationSteps([]);
    setShowSimulation(false);

    try {
      const response = await provideContextualEmotionalSupport({ textInput: input });
      setAiResponse(response);
      
      const steps = [...initialSimulationSteps];
      steps[0].status = 'loading';
      setSimulationSteps(steps);
      setShowSimulation(true);

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
  
  const getStatusColor = (status: SimulationStep['status']) => {
    if (status === 'done') return 'border-green-500/50 bg-green-500/10';
    if (status === 'loading') return 'border-blue-500/50 bg-blue-500/10 animate-pulse';
    return 'border-border bg-card';
  };
  
  const getStatusIcon = (status: SimulationStep['status']) => {
    if (status === 'loading') return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    if (status === 'done') return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <Lock className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-3 animate-fade-in-up">
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
            <Card className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Detected Emotion</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{aiResponse.emotionalState}</div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Personalized Response</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{aiResponse.personalizedResponse}</p>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Suggested Coping Exercise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{aiResponse.copingExercise}</p>
              </CardContent>
            </Card>
          </>
        )}
        
        {showSimulation && (
          <Card className="lg:col-span-3 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock size={20}/> Your Data, Your Control: The Web3 Journey</CardTitle>
              <CardDescription>This simulation shows how your data is handled in a decentralized, private, and secure way.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {simulationSteps.map((step, index) => (
                    <div key={index} className="relative flex flex-col h-full">
                       <Card className={`flex-grow transition-all duration-500 ${getStatusColor(step.status)}`}>
                          <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${step.status === 'done' ? 'bg-green-500/20' : step.status === 'loading' ? 'bg-blue-500/20' : 'bg-accent/10'}`}>
                                {step.status === 'done' ? <CheckCircle className="h-8 w-8 text-green-500"/> : step.status === 'loading' ? <Loader2 className="h-8 w-8 animate-spin text-blue-500"/> : <div className="text-muted-foreground">{step.icon}</div>}
                              </div>
                              <CardTitle className="text-base">{step.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                             <p className="text-sm text-muted-foreground">{step.longDescription}</p>
                          </CardContent>
                       </Card>
                       {index < simulationSteps.length - 1 && (
                         <ArrowRight className={`absolute top-1/2 -right-6 -translate-y-1/2 h-8 w-8 text-muted-foreground transition-all duration-500 ${step.status === 'done' ? 'text-green-500' : ''} hidden md:block`} />
                       )}
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
