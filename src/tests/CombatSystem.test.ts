import { describe, it, expect } from 'vitest';

import { CombatSystem } from '../services/CombatSystem';
import { createTestEnemy, createTestPlayer } from './utils/testHelper';

describe('Combat System', () => {
  it('should simulate a battle between player and enemy', () => {
    const player = createTestPlayer();
    const enemy = createTestEnemy();

    const combat = new CombatSystem(player, enemy);
    combat.startBattle();

    expect(player.stats.health === 0 || enemy.stats.health === 0).toBe(true);
  });
});