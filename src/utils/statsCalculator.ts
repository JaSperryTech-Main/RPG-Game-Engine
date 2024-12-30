import { TStats } from '../types/StatsType';

const BASE_STATS = {
  health: 50,
  mana: 25,
  attack: 10,
  defense: 5,
} as const;

/**
 * The function calculates base stats for a character based on their level.
 * @param {number} level - The `level` parameter in the `calculateBaseStats` function represents the
 * level of a character in a game. The function calculates and returns the base stats of the character
 * based on their level.
 * @returns The function `calculateBaseStats` returns an object with calculated base stats based on the
 * input `level`. The object includes properties for `health`, `maxHealth`, `mana`, `maxMana`,
 * `attack`, and `defense`, each with their respective calculated values based on the input level.
 */
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
