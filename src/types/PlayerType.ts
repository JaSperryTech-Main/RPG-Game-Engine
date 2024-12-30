// PlayerType.ts

import { TInventoryItem } from './InventoryItemType';
import { TStatModifiers, TStats } from './StatsType';

// Define Type for Player Structure
export type TPlayer = {
  name: string;
  level: number;
  experience: number;
  stats: TStats;
  inventory: TInventoryItem[];
  addItem: (item: TInventoryItem) => void;
  removeItem: (itemId: string) => void;
  levelUp: () => void;
  applyStatModifiers: (modifiers: TStatModifiers) => void;
  addExperience: (exp: number) => void;
};