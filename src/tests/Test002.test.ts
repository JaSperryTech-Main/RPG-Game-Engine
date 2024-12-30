import { describe, it, expect } from 'vitest';

import { CombatSystem } from '../services/CombatSystem';
import { TEnemy } from '../types/EnemyType';
import { TInventoryItem } from '../types/InventoryItemType';
import { TPlayer } from '../types/PlayerType';

describe('Rare Gem Drop', () => {
  it('should eventually get a rare gem from a high-level enemy', () => {
    let receivedRareGem = false;
    let attempts = 0;
    const maxAttempts = 100;

    const player: TPlayer = {
      name: 'Hero',
      level: 1,
      experience: 0,
      stats: {
        health: 200,
        maxHealth: 200,
        mana: 50,
        maxMana: 50,
        attack: 30,
        defense: 15,
      },
      inventory: [],
      playerClass: {
        name: 'Warrior',
        description: 'A strong warrior',
        baseStats: {
          health: 200,
          mana: 50,
          attack: 30,
          defense: 15,
        },
        statGrowth: {
          health: 20,
          mana: 5,
          attack: 5,
          defense: 3,
        },
      },
      addItem: (item: TInventoryItem) => {
        player.inventory.push(item);
        if (item.id === 'rare_gem') {
          receivedRareGem = true;
        }
      },
      removeItem: (itemId: string) => {
        player.inventory = player.inventory.filter(item => item.id !== itemId);
      },
      levelUp: () => {},
      applyStatModifiers: () => {},
      addExperience: () => {},
    };

    while (!receivedRareGem && attempts < maxAttempts) {
      attempts++;
      
      player.stats.health = player.stats.maxHealth;
      
      const enemy: TEnemy = {
        name: 'Dragon',
        level: 6,
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
      };

      const combat = new CombatSystem(player, enemy);
      combat.startBattle();
    }

    expect(receivedRareGem).toBe(true);
    expect(attempts).toBeLessThanOrEqual(maxAttempts);
    
    const rareGems = player.inventory.filter(item => item.id === 'rare_gem');
    expect(rareGems.length).toBeGreaterThan(0);
  });
});