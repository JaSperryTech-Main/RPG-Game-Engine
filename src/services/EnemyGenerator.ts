import { TEnemy } from '../types/EnemyType';
import { TInventoryItem } from '../types/InventoryItemType';
import { handleInventory } from '../utils/inventoryManager';
import { calculateBaseStats } from '../utils/statsCalculator';

export class EnemyGenerator {
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
