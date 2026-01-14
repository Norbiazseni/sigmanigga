export interface Challenge {
  id?: number;
  title: string;
  category: 'CODE' | 'DESIGN' | 'DATA' | 'SOFT';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  rewardPoints: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
}
