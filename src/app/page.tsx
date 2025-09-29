import { Button } from '@/components/ui/button';
import { ArrowRight, BotMessageSquare, BrainCircuit, Lock, Coins, ShieldCheck, DatabaseZap, Star } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <BotMessageSquare className="h-6 w-6 text-primary" />
              <span className="font-bold">NeuroWeb3</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
             <nav className="flex items-center">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  Enter App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container relative px-4 md:px-6">
           <section className="relative py-20 md:py-32 lg:py-40">
            <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-primary/10 via-transparent to-primary/10"></div>
            <div className="grid grid-cols-1 gap-8 text-center">
              <div className="flex flex-col items-center gap-4">
                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Your AI Mental Health Twin
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  A personalized, decentralized AI companion for adaptive, secure, and rewarding emotional support.
                </p>
                <div className="flex gap-4">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 lg:py-32">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
                <div className="p-4 rounded-full bg-primary/20">
                    <BrainCircuit className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Truly Personalized AI</h3>
                <p className="text-muted-foreground">Your AI Twin evolves with you, remembering your journey to provide deeply contextual support.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
                <div className="p-4 rounded-full bg-primary/20">
                    <Lock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Decentralized & Private</h3>
                <p className="text-muted-foreground">Your data is encrypted and stored on a decentralized network. You own your story.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
                <div className="p-4 rounded-full bg-primary/20">
                    <Coins className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Rewarding Wellness</h3>
                <p className="text-muted-foreground">Earn Wellness Tokens for building healthy habits and redeem them for real-world benefits.</p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 lg:py-32">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works: The Web3 Difference</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">We've engineered a system where your privacy isn't an afterthought—it's the foundation.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <div className="relative flex flex-col items-center text-center">
                     <div className="p-4 mb-4 rounded-full bg-primary/20 ring-4 ring-primary/10">
                        <ShieldCheck className="h-10 w-10 text-primary" />
                     </div>
                     <h3 className="text-xl font-bold">1. On-Device Encryption</h3>
                     <p className="text-muted-foreground mt-2">Your data is encrypted on your device before it ever leaves. Only you hold the key.</p>
                  </div>
                  <div className="relative hidden md:block">
                     <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-muted-foreground/30 mt-5" />
                  </div>
                  <div className="relative flex flex-col items-center text-center">
                     <div className="p-4 mb-4 rounded-full bg-primary/20 ring-4 ring-primary/10">
                        <DatabaseZap className="h-10 w-10 text-primary" />
                     </div>
                     <h3 className="text-xl font-bold">2. Decentralized Storage</h3>
                     <p className="text-muted-foreground mt-2">Your encrypted data is stored on IPFS, a distributed network, not on a central server.</p>
                  </div>
                  <div className="relative hidden md:block">
                     <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-muted-foreground/30 mt-5" />
                  </div>
                  <div className="relative flex flex-col items-center text-center">
                     <div className="p-4 mb-4 rounded-full bg-primary/20 ring-4 ring-primary/10">
                        <Star className="h-10 w-10 text-primary" />
                     </div>
                     <h3 className="text-xl font-bold">3. Proof of Wellness</h3>
                     <p className="text-muted-foreground mt-2">A "Wellness Token" is minted on-chain as a secure, immutable record of your progress.</p>
                  </div>
             </div>
          </section>
        </div>
      </main>

       <footer className="border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 py-8 md:flex-row md:py-10">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            A submission for the Paranox 2.O Hackathon.
          </p>
        </div>
      </footer>
    </div>
  );
}
