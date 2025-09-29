import { Button } from '@/components/ui/button';
import { ArrowRight, BotMessageSquare, BrainCircuit, Lock, Coins } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <BotMessageSquare className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">NeuroWeb3</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
             <nav className="flex items-center">
              <Button variant="outline" className="mr-4" asChild>
                  <Link href="/dashboard">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="relative py-20 md:py-32 lg:py-40 animate-fade-in-up">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-start text-left gap-6">
                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl !leading-tight">
                  Your AI Companion for Mental Wellness
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  A personalized, decentralized AI twin that understands you. Secure, private, and rewarding. Take control of your mental health journey today.
                </p>
                <div className="flex gap-4">
                  <Button asChild size="lg" className="h-12 text-base px-8">
                    <Link href="/dashboard">
                      Meet Your Twin
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                 <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                 <Image 
                    src="https://picsum.photos/seed/ai-brain/600/600"
                    alt="AI Twin"
                    width={500}
                    height={500}
                    data-ai-hint="abstract brain"
                    className="rounded-full object-cover z-10 animate-float"
                 />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why NeuroWeb3?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A new era of mental wellness technology.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl border border-border bg-background/50 hover:border-primary/30 hover:bg-background transition-all duration-300 transform hover:-translate-y-2">
                        <div className="p-4 rounded-full bg-primary/20">
                            <BrainCircuit className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Truly Personal AI</h3>
                        <p className="text-muted-foreground">Your AI Twin learns and evolves with you, providing deeply contextual and adaptive support based on your unique history.</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl border border-border bg-background/50 hover:border-primary/30 hover:bg-background transition-all duration-300 transform hover:-translate-y-2">
                        <div className="p-4 rounded-full bg-primary/20">
                            <Lock className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">You Own Your Data</h3>
                        <p className="text-muted-foreground">Built on Web3, your data is encrypted and stored on a decentralized network. Your privacy is paramount.</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl border border-border bg-background/50 hover:border-primary/30 hover:bg-background transition-all duration-300 transform hover:-translate-y-2">
                        <div className="p-4 rounded-full bg-primary/20">
                            <Coins className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Rewarding Wellness</h3>
                        <p className="text-muted-foreground">Earn "Wellness Tokens" for engaging in healthy habits and redeem them for real-world benefits that support you.</p>
                    </div>
                </div>
            </div>
        </section>

      </main>

       <footer className="border-t border-border/40 bg-secondary/50">
        <div className="container flex flex-col items-center justify-center gap-4 py-8 md:flex-row md:py-10">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            A submission for the Paranox 2.O Hackathon. Built with Firebase and Google AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
