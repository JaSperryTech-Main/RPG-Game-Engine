import { TStats } from '../types/StatsType';

const BASE_STATS = {
  health: 50,
  mana: 25,
  attack: 10,
  defense: 5,
} as const;

export function calculateBaseStats(level: number): TStats {
  return {
    health: BASE_STATS.health + level * 10,
    maxHealth: BASE_STATS.health + level * 10,
    mana: BASE_STATS.mana + level * 5,
    maxMana: BASE_STATS.mana + level * 5,
    attack: BASE_STATS.attack + level * 2,
    defense: BASE_STATS.defense + level,
  };
}
