import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Abilities } from '../services/AbilityModule';
import { CombatSystem } from '../services/CombatSystem';
import { TEnemy } from '../types/EnemyType';
import { TPlayer } from '../types/PlayerType';

describe('Combat System - Abilities', () => {
  let player: TPlayer;
  let enemy: TEnemy;
  let combatSystem: CombatSystem;

  beforeEach(() => {
    // Mock player
    player = {
      name: 'Hero',
      level: 5,
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
      addItem: vi.fn(),
      removeItem: vi.fn(),
      levelUp: vi.fn(),
      applyStatModifiers: vi.fn(),
      addExperience: vi.fn(),
      playerClass: {
        name: 'Mage',
        description: 'A master of magical arts.',
        baseStats: {
          health: 0,
          mana: 0,
          attack: 0,
          defense: 0,
        },
        statGrowth: {
          health: 0,
          mana: 0,
          attack: 0,
          defense: 0,
        },
      },
    };

    // Mock enemy
    enemy = {
      name: 'Goblin',
      level: 3,
      experience: 0,
      stats: {
        health: 50,
        maxHealth: 50,
        mana: 0,
        maxMana: 0,
        attack: 10,
        defense: 3,
      },
      inventory: [],
      addItem: vi.fn(),
      removeItem: vi.fn(),
      levelUp: vi.fn(),
    };

    // Initialize Combat System
    combatSystem = new CombatSystem(player, enemy);
  });

  it('should allow the player to use an ability', () => {
    const fireball = Abilities.Mage.find((ability) => ability.name === 'Fireball');
    if (!fireball) throw new Error('Fireball ability not found');

    // Simulate using Fireball
    const abilityUsed = combatSystem.useAbility(fireball);

    expect(player.stats.mana).toBe(50 - fireball.manaCost); // Check mana reduction
    expect(enemy.stats.health).toBeLessThan(50); // Check enemy took damage
    expect(abilityUsed).toBe(false); // Enemy not dead yet
  });

  it('should not allow the player to use an ability without enough mana', () => {
    player.stats.mana = 0; // Set player mana to 0
    const fireball = Abilities.Mage.find((ability) => ability.name === 'Fireball');
    if (!fireball) throw new Error('Fireball ability not found');

    const abilityUsed = combatSystem.useAbility(fireball);

    expect(player.stats.mana).toBe(0); // Mana should not change
    expect(enemy.stats.health).toBe(50); // Enemy health should not change
    expect(abilityUsed).toBe(false); // Ability could not be used
  });

  it('should allow the player to win using abilities', () => {
    // Reduce enemy health to a level where one ability would kill
    enemy.stats.health = 10;

    const fireball = Abilities.Mage.find((ability) => ability.name === 'Fireball');
    if (!fireball) throw new Error('Fireball ability not found');

    const abilityUsed = combatSystem.useAbility(fireball);

    expect(enemy.stats.health).toBe(0); // Enemy should be dead
    expect(abilityUsed).toBe(true); // Player won
  });

  it('should execute a full combat scenario with abilities', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {}); // Suppress logs during testing

    combatSystem.startBattle();

    // Check that the battle ends correctly
    expect(player.stats.health).toBeGreaterThan(0); // Player should survive
    expect(enemy.stats.health).toBe(0); // Enemy should be dead
  });
});
