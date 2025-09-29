export type Mood = 'happy' | 'neutral' | 'sad' | 'anxious' | 'calm';

export interface MoodLog {
  id: string;
  mood: Mood;
  timestamp: Date;
}

export interface JournalEntry {
  id: string;
  prompt: string;
  content: string;
  timestamp: Date;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  imageId: string;
  imageHint: string;
}
