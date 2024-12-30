import { TEnemy } from '../types/EnemyType';
import { TInventoryItem } from '../types/InventoryItemType';
import { TPlayer } from '../types/PlayerType';

export class RewardSystem {
  static calculateXPReward(enemyLevel: number): number {
    // Formula for XP reward based on enemy level
    return enemyLevel * 50 + Math.floor(Math.random() * 20);
  }

  static generateLoot(enemyLevel: number): TInventoryItem[] {
    const lootTable: TInventoryItem[] = [
      { id: 'potion', name: 'Health Potion', quantity: 1 },
      { id: 'mana_potion', name: 'Mana Potion', quantity: 1 },
      { id: 'gold_coin', name: 'Gold Coin', quantity: 10 },
    ];

    // Adjust loot rarity by level
    const loot: TInventoryItem[] = [];
    const lootChance = Math.random();

    if (lootChance > 0.7) {
      loot.push(lootTable[Math.floor(Math.random() * lootTable.length)]);
    }

    if (enemyLevel > 5 && Math.random() > 0.8) {
      loot.push({ id: 'rare_gem', name: 'Rare Gem', quantity: 1 });
    }

    return loot;
  }

  static applyRewards(player: TPlayer, enemy: TEnemy) {
    // XP Reward
    const xpReward = this.calculateXPReward(enemy.level);
    console.log(`${player.name} defeated ${enemy.name} and gained ${xpReward} XP!`);
    player.addExperience(xpReward);

    // Loot Generation
    const loot = this.generateLoot(enemy.level);
    if (loot.length > 0) {
      console.log(`${enemy.name} dropped loot:`);
      loot.forEach((item) => {
        console.log(`- ${item.name} (x${item.quantity})`);
        player.addItem(item);
      });
    } else {
      console.log(`${enemy.name} dropped no loot.`);
    }
  }
}
