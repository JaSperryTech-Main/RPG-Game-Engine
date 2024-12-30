// TEnemyType.ts

import { TInventoryItem } from './InventoryItemType';
import { TStats } from './StatsType';

// Define Type for Enemy Structure
export type TEnemy = {
  name: string;
  level: number;
  experience: number;
  stats: TStats;
  inventory: TInventoryItem[];
  addItem: (item: TInventoryItem) => void;
  removeItem: (itemId: string) => void;
  levelUp: () => void;
};
