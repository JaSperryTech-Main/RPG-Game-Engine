// TEnemyType.ts

import { TInventoryItem } from './InventoryItemType';
import { TStats } from './StatsType';

// Define Type for Enemy Structure
/**
 * The type `TEnemy` represents an enemy character with properties such as name, level, experience,
 * stats, inventory, and methods to manipulate items and level up.
 * @property {string} name - The `name` property in the `TEnemy` type represents the name of the enemy.
 * It is a string type.
 * @property {number} level - The `level` property in the `TEnemy` type represents the level of the
 * enemy character. It is a numeric value that indicates the strength or difficulty of the enemy in the
 * game.
 * @property {number} experience - The `experience` property in the `TEnemy` type represents the amount
 * of experience points the enemy has gained. This value typically increases as the enemy defeats
 * players or completes certain actions in the game.
 * @property {TStats} stats - The `stats` property in the `TEnemy` type represents the statistics or
 * attributes of the enemy character. It likely includes values such as health points, attack power,
 * defense, speed, etc. The `stats` property is of type `TStats`, which is presumably another type that
 * defines the
 * @property {TInventoryItem[]} inventory - The `inventory` property in the `TEnemy` type represents an
 * array of `TInventoryItem` objects. This array contains the items that the enemy currently possesses.
 * @property addItem - The `addItem` property in the `TEnemy` type is a function that takes an argument
 * of type `TInventoryItem` and does not return anything (`void`). This function is used to add an item
 * to the enemy's inventory.
 * @property removeItem - The `removeItem` property in the `TEnemy` type is a function that takes an
 * `itemId` of type string as a parameter and does not return anything. This function is used to remove
 * an item from the enemy's inventory based on the provided `itemId`.
 * @property levelUp - The `levelUp` method in the `TEnemy` type is a function that represents the
 * action of leveling up the enemy. When this method is called, it should increase the level of the
 * enemy and potentially adjust other properties such as stats or experience accordingly.
 */
export type TEnemy = {
  name: string;
  level: number;
  experience: number;
  stats: TStats;
  inventory: TInventoryItem[];
  addItem: (item: TInventoryItem) => void;
  removeItem: (itemId: string) => void;
  levelUp: () => void;
};
