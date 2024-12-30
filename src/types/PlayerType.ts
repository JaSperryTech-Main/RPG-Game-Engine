// PlayerType.ts

import { TInventoryItem } from './InventoryItemType';
import { TStatModifiers, TStats } from './StatsType';

/**
 * The type `TPlayer` defines the structure of a player object in a TypeScript application, including
 * properties like name, level, experience, stats, inventory, and methods for managing items, leveling
 * up, applying stat modifiers, and gaining experience.
 * @property {string} name - The `name` property in the `TPlayer` type represents the name of the
 * player. It is of type `string`.
 * @property {number} level - The `level` property in the `TPlayer` type represents the level of the
 * player character. It is a number that indicates the current level of the player within the game.
 * @property {number} experience - The `experience` property in the `TPlayer` type represents the
 * amount of experience points a player has gained in the game. It is a numerical value that typically
 * increases as the player completes tasks, defeats enemies, or achieves goals within the game.
 * @property {TStats} stats - The `stats` property in the `TPlayer` type represents the statistics of a
 * player in a game. It is of type `TStats`, which likely includes various attributes such as strength,
 * agility, intelligence, etc., along with their corresponding values.
 * @property {TInventoryItem[]} inventory - The `inventory` property in the `TPlayer` type represents
 * an array of `TInventoryItem` objects. This array contains the items that the player currently
 * possesses.
 * @property addItem - The `addItem` property in the `TPlayer` type is a function that takes an
 * argument `item` of type `TInventoryItem` and does not return anything (`void`). This function is
 * used to add an item to the player's inventory.
 * @property removeItem - The `removeItem` property in the `TPlayer` type is a function that takes an
 * `itemId` of type string as a parameter and does not return anything. It is used to remove an item
 * from the player's inventory based on the provided `itemId`.
 * @property levelUp - The `levelUp` function in the `TPlayer` type is responsible for increasing the
 * player's level when called. It likely contains the logic to increment the player's level and adjust
 * any other properties or stats that may be affected by leveling up.
 * @property applyStatModifiers - The `applyStatModifiers` function in the `TPlayer` type is
 * responsible for applying stat modifiers to the player's stats. It takes a parameter `modifiers` of
 * type `TStatModifiers`, which likely contains information about how the player's stats should be
 * modified. This function would update the player
 * @property addExperience - The `addExperience` property in the `TPlayer` type is a function that
 * takes a number parameter `exp` representing the amount of experience points to add to the player's
 * current experience.
 */
export type TPlayer = {
  name: string;
  level: number;
  experience: number;
  stats: TStats;
  inventory: TInventoryItem[];
  addItem: (item: TInventoryItem) => void;
  removeItem: (itemId: string) => void;
  levelUp: () => void;
  applyStatModifiers: (modifiers: TStatModifiers) => void;
  addExperience: (exp: number) => void;
};
