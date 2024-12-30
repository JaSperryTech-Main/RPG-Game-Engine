import { describe, it, expect } from 'vitest';

import { RewardSystem } from '../services/RewardSystem';
import { createTestEnemy, createTestPlayer } from './utils/testHelper';

describe('Reward System', () => {
  it('should eventually drop a rare gem from high-level enemies', () => {
    let receivedRareGem = false;
    let attempts = 0;
    const maxAttempts = 100;

    const player = createTestPlayer({
      stats: {
        health: 200,
        maxHealth: 200,
        mana: 50,
        maxMana: 50,
        attack: 30,
        defense: 15,
      },
      addItem: (item) => {
        if (item.id === 'rare_gem') {
          receivedRareGem = true;
        }
      },
    });

    while (!receivedRareGem && attempts < maxAttempts) {
      attempts++;
      const enemy = createTestEnemy({
        name: 'Dragon',
        level: 6,
      });
      
      RewardSystem.applyRewards(player, enemy);
    }

    expect(receivedRareGem).toBe(true);
    expect(attempts).toBeLessThanOrEqual(maxAttempts);
  });
});