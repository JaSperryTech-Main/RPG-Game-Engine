import { TEnemy } from '../types/EnemyType';
import { TInventoryItem } from '../types/InventoryItemType';
import { TPlayer } from '../types/PlayerType';

/* The `RewardSystem` class in TypeScript provides methods to calculate XP rewards and generate loot
for players after defeating enemies in a game. */
export class RewardSystem {
  /**
   * The function calculates XP reward based on the enemy level with a random bonus.
   * @param {number} enemyLevel - The `enemyLevel` parameter represents the level of the enemy defeated
   * in a game. This function calculates the XP (experience points) reward based on the enemy's level
   * using a formula that multiplies the enemy level by 50 and adds a random value between 0 and 19.
   * @returns the XP reward based on the enemy level. The XP reward is calculated using the formula
   * `enemyLevel * 50 + Math.floor(Math.random() * 20)`.
   */
  static calculateXPReward(enemyLevel: number): number {
    // Formula for XP reward based on enemy level
    return enemyLevel * 50 + Math.floor(Math.random() * 20);
  }

  /**
   * The function `generateLoot` generates loot items based on the enemy level with adjusted rarity
   * chances.
   * @param {number} enemyLevel - The `enemyLevel` parameter in the `generateLoot` function represents
   * the level of the enemy defeated by the player. This parameter is used to adjust the loot rarity
   * based on the level of the enemy. The function generates loot items based on the enemy level and
   * random chance conditions.
   * @returns The `generateLoot` function returns an array of `TInventoryItem` objects representing the
   * loot dropped by an enemy based on the enemy's level and random chance. The loot items are selected
   * from a predefined `lootTable` array, with additional rare loot items added based on certain
   * conditions such as the enemy level and random chance.
   */
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

  /**
   * The function `applyRewards` in TypeScript calculates XP rewards and generates loot for a player
   * after defeating an enemy.
   * @param {TPlayer} player - The `player` parameter in the `applyRewards` function represents the
   * player character who defeated the enemy and will receive rewards such as experience points and
   * loot. This player object likely contains properties and methods related to the player's name,
   * level, experience points, inventory, and so on.
   * @param {TEnemy} enemy - The `enemy` parameter in the `applyRewards` function represents the
   * opponent that the player has defeated in the game. It is of type `TEnemy`, which likely contains
   * information about the enemy such as its name, level, and possibly other attributes like health,
   * attack power, etc.
   */
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
