"use client";

import { useState, useMemo } from 'react';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mood } from '@/lib/types';
import { Smile, Meh, Frown, Annoyed, Zap } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { format } from 'date-fns';

const moodOptions: { mood: Mood, icon: React.ReactNode, label: string }[] = [
  { mood: 'happy', icon: <Smile className="h-8 w-8 text-green-500" />, label: 'Happy' },
  { mood: 'calm', icon: <Zap className="h-8 w-8 text-blue-500" />, label: 'Calm' },
  { mood: 'neutral', icon: <Meh className="h-8 w-8 text-yellow-500" />, label: 'Neutral' },
  { mood: 'sad', icon: <Frown className="h-8 w-8 text-gray-500" />, label: 'Sad' },
  { mood: 'anxious', icon: <Annoyed className="h-8 w-8 text-purple-500" />, label: 'Anxious' },
];

const moodToValue = {
  happy: 5,
  calm: 4,
  neutral: 3,
  sad: 2,
  anxious: 1,
};

export default function MoodTrackerPage() {
  const { moodLogs, addMoodLog, addWellnessTokens } = useAppContext();
  const { toast } = useToast();

  const handleMoodLog = (mood: Mood) => {
    addMoodLog({
      id: new Date().toISOString(),
      mood,
      timestamp: new Date(),
    });
    addWellnessTokens(1);
    toast({
      title: "Mood Logged!",
      description: `You've earned 1 Wellness Token for logging your mood as ${mood}.`,
    });
  };

  const chartData = useMemo(() => {
    return moodLogs.slice(-10).map(log => ({
      name: format(log.timestamp, 'MMM d, h:mm a'),
      mood: moodToValue[log.mood],
      label: log.mood,
    }));
  }, [moodLogs]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Mood Tracker</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How are you feeling right now?</CardTitle>
          <CardDescription>Log your current mood to track your emotional patterns.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around items-center flex-wrap gap-4">
            {moodOptions.map(({ mood, icon, label }) => (
              <Button
                key={mood}
                variant="ghost"
                className="flex flex-col h-24 w-24 gap-2 items-center justify-center rounded-lg hover:bg-accent/50"
                onClick={() => handleMoodLog(mood)}
              >
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Mood History</CardTitle>
          <CardDescription>A look at your most recent mood entries.</CardDescription>
        </CardHeader>
        <CardContent>
          {moodLogs.length > 0 ? (
            <ChartContainer config={{
              mood: {
                label: "Mood",
                color: "hsl(var(--accent))",
              },
            }} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis
                    domain={[0, 5]}
                    tickFormatter={(value) => Object.keys(moodToValue).find(key => moodToValue[key as Mood] === value) || ''}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--background))' }}
                    content={<ChartTooltipContent 
                      formatter={(value, name, props) => (
                        <div className="flex flex-col">
                           <span className="font-bold capitalize">{props.payload.label}</span>
                           <span className="text-xs text-muted-foreground">{props.payload.name}</span>
                        </div>
                       )}
                    />}
                  />
                  <Bar dataKey="mood" radius={[4, 4, 0, 0]} fill="var(--color-mood)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p className="text-muted-foreground text-center py-8">Log your mood to see your history here.</p>
          )}
        </CardContent>
      </Card>

    </main>
  );
}
