import { describe, it, expect } from 'vitest';

import { CombatSystem } from '../services/CombatSystem';
import { TEnemy } from '../types/EnemyType';
import { TPlayer } from '../types/PlayerType';

describe('Combat System', () => {
  it('should simulate a battle between player and enemy', () => {
    // Create a player and an enemy
    const player: TPlayer = {
      name: 'Hero',
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
      addItem: () => {},
      removeItem: () => {},
      levelUp: () => {},
      applyStatModifiers: () => {},
      addExperience: () => {},
    };

    const enemy: TEnemy = {
      name: 'Goblin',
      level: 1,
      experience: 0,
      stats: {
        health: 50, // Reduced health to make battle shorter
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
    };

    // Start the battle with a maximum of 20 turns
    const combat = new CombatSystem(player, enemy, 20);
    const result = combat.startBattle();

    // Battle should end with either player victory, enemy victory, or draw
    expect(['player', 'enemy', 'draw']).toContain(result);
    
    // After battle, either player or enemy should be defeated, or it should be a draw
    if (result === 'player') {
      expect(enemy.stats.health).toBe(0);
    } else if (result === 'enemy') {
      expect(player.stats.health).toBe(0);
    } else {
      expect(combat.currentTurn).toBe(combat.maxTurns);
    }
  });
});