import { describe, expect, it } from 'vitest';

import { Abilities } from '../services/AbilityModule';
import { CombatSystem } from '../services/CombatSystem';
import { createTestEnemy, createTestPlayer } from './utils/testHelper';

describe('Combat System - Abilities', () => {
  it('should allow the player to use an ability', () => {
    const player = createTestPlayer({
      playerClass: {
        name: 'Mage',
        description: 'A master of magical arts.',
        baseStats: {
          health: 100,
          mana: 50,
          attack: 15,
          defense: 5,
        },
        statGrowth: {
          health: 10,
          mana: 10,
          attack: 3,
          defense: 1,
        },
      },
    });

    const enemy = createTestEnemy();
    const combat = new CombatSystem(player, enemy);

    const fireball = Abilities.Mage.find((ability) => ability.name === 'Fireball');
    if (!fireball) throw new Error('Fireball ability not found');

    const abilityUsed = combat.useAbility(fireball);

    expect(player.stats.mana).toBe(30); // 50 - 20 (fireball cost)
    expect(enemy.stats.health).toBeLessThan(50);
    expect(abilityUsed).toBe(false);
  });
});
