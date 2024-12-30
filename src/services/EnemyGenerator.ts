import { TEnemy } from '../types/EnemyType';
import { TInventoryItem } from '../types/InventoryItemType';
import { handleInventory } from '../utils/inventoryManager';
import { calculateBaseStats } from '../utils/statsCalculator';

/* The `EnemyGenerator` class in TypeScript contains methods to create and level up enemy objects in a
game. */
export class EnemyGenerator {
  /**
   * The function `createEnemy` generates a new enemy object with specified player level and base
   * stats.
   * @param {number} playerLevel - The `playerLevel` parameter is a number that represents the level of
   * the player. It is used to calculate the base stats for creating an enemy with similar level
   * attributes.
   * @returns The `createEnemy` function is returning an object of type `TEnemy` with properties such
   * as name, level, experience, stats, inventory, addItem function, removeItem function, and levelUp
   * function.
   */
  static createEnemy(playerLevel: number): TEnemy {
    const stats = calculateBaseStats(playerLevel);
    const enemy: TEnemy = {
      name: `Enemy Lvl ${playerLevel}`,
      level: playerLevel,
      experience: 0,
      stats,
      inventory: [],
      addItem: (item: TInventoryItem) => handleInventory.addItem(enemy, item),
      removeItem: (itemId: string) => handleInventory.removeItem(enemy, itemId),
      levelUp: () => this.levelUp(enemy),
    };

    return enemy;
  }

  /**
   * The function `levelUp` increases an enemy's level and updates its stats accordingly.
   * @param {TEnemy} enemy - TEnemy is a type representing an enemy character in a game. It likely
   * contains properties such as name, level, stats (including maxHealth, maxMana, health, mana,
   * attack, defense), etc. The `levelUp` function takes an enemy object as a parameter and increases
   * its level while
   */
  static levelUp(enemy: TEnemy): void {
    const { stats } = enemy;
    enemy.level++;

    // Apply level-up bonuses
    stats.maxHealth += 10 + enemy.level * 2;
    stats.maxMana += 5 + enemy.level;
    stats.health = stats.maxHealth;
    stats.mana = stats.maxMana;
    stats.attack += 2;
    stats.defense += 1;

    console.log(`${enemy.name} leveled up to level ${enemy.level}!`);
  }
}
