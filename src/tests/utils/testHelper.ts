import { TEnemy } from '../../types/EnemyType';
import { TPlayer } from '../../types/PlayerType';

export const createTestPlayer = (overrides: Partial<TPlayer> = {}): TPlayer => ({
  name: 'Test Hero',
  level: 1,
  experience: 0,
  stats: {
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    attack: 15,
    defense: 5,
  },
  inventory: [],
  playerClass: {
    name: 'Warrior',
    description: 'A strong warrior',
    baseStats: {
      health: 100,
      mana: 50,
      attack: 15,
      defense: 5,
    },
    statGrowth: {
      health: 10,
      mana: 5,
      attack: 3,
      defense: 2,
    },
  },
  addItem: () => {},
  removeItem: () => {},
  levelUp: () => {},
  applyStatModifiers: () => {},
  addExperience: () => {},
  ...overrides,
});

export const createTestEnemy = (overrides: Partial<TEnemy> = {}): TEnemy => ({
  name: 'Test Enemy',
  level: 1,
  experience: 0,
  stats: {
    health: 50,
    maxHealth: 50,
    mana: 50,
    maxMana: 50,
    attack: 10,
    defense: 5,
  },
  inventory: [],
  addItem: () => {},
  removeItem: () => {},
  levelUp: () => {},
  ...overrides,
});