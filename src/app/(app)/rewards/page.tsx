"use client";

import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Reward } from '@/lib/types';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award } from 'lucide-react';

const rewards: Reward[] = [
  { id: '1', title: '1-Month Meditation App Subscription', description: 'Unlock premium access to a leading meditation app.', cost: 25, imageId: 'reward-meditation', imageHint: 'person meditating' },
  { id: '2', title: 'Discount on Professional Counseling', description: 'Get 20% off your first session with a licensed therapist.', cost: 50, imageId: 'reward-counseling', imageHint: 'therapy session' },
  { id: '3', title: '1-Month Fitness App Subscription', description: 'Access premium workout plans and fitness tracking.', cost: 30, imageId: 'reward-fitness', imageHint: 'woman yoga' },
  { id: '4', title: 'Donate to Mental Health NGO', description: 'Convert your tokens into a donation to a mental health charity.', cost: 10, imageId: 'reward-ngo', imageHint: 'charity donation' },
];

export default function RewardsPage() {
  const { wellnessTokens } = useAppContext();
  const { toast } = useToast();

  const handleRedeem = (cost: number) => {
    toast({
      title: "Feature Coming Soon",
      description: "Redemption functionality is part of our future roadmap!",
    });
  };

  const getImageUrl = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId)?.imageUrl || "https://picsum.photos/seed/default/600/400";
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Wellness Rewards</h1>
        <div className="flex items-center gap-2 rounded-lg bg-primary/20 px-4 py-2">
            <Award className="h-5 w-5 text-primary-foreground"/>
            <span className="font-bold text-lg text-primary-foreground">{wellnessTokens}</span>
            <span className="text-sm text-primary-foreground">Tokens</span>
        </div>
      </div>
      <p className="text-muted-foreground">Redeem your Wellness Tokens for real-world benefits that support your mental and physical health.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rewards.map(reward => (
          <Card key={reward.id} className="flex flex-col">
            <CardHeader className="p-0">
               <Image 
                src={getImageUrl(reward.imageId)}
                alt={reward.title}
                width={600}
                height={400}
                data-ai-hint={reward.imageHint}
                className="rounded-t-lg aspect-[3/2] object-cover"
               />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-semibold text-base mb-1">{reward.title}</h3>
              <p className="text-sm text-muted-foreground">{reward.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full" 
                disabled={wellnessTokens < reward.cost}
                onClick={() => handleRedeem(reward.cost)}
              >
                Redeem for {reward.cost} Tokens
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
