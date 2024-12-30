// StatsType.ts

// Define Type for Stat Structure
export type TStats = {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
};

export type TStatModifiers = {
  health?: number;
  attack?: number;
  defense?: number;
  mana?: number;
};
