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

    // Create a strong player to ensure victories
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

    // Keep fighting until we get a rare gem or reach max attempts
    while (!receivedRareGem && attempts < maxAttempts) {
      attempts++;
      
      // Reset player health for next battle
      player.stats.health = player.stats.maxHealth;
      
      // Create a level 6 enemy (above level 5 threshold for rare gem drops)
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

      const combat = new CombatSystem(player, enemy, 20);
      const result = combat.startBattle();

      console.log(`Battle ${attempts} result: ${result}`);
      console.log(`Current inventory items: ${player.inventory.map(item => item.name).join(', ')}`);
    }

    expect(receivedRareGem).toBe(true);
    expect(attempts).toBeLessThanOrEqual(maxAttempts);
    
    const rareGems = player.inventory.filter(item => item.id === 'rare_gem');
    console.log(`Found rare gem after ${attempts} attempts!`);
    console.log(`Total rare gems found: ${rareGems.length}`);
  });
});