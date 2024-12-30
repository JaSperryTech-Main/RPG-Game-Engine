// PlayerModule.ts

import { PlayerClasses } from './PlayerClassModule';
import { XPSystem } from './XPSystem';
import { TInventoryItem } from '../types/InventoryItemType';
import { TPlayer } from '../types/PlayerType';
import { TStatModifiers } from '../types/StatsType';

/* The `PlayerModule` class in TypeScript defines a player object with attributes and methods for
managing experience, stats, inventory, and leveling up. */
export class PlayerModule {
  player: TPlayer;
  xpSystem: XPSystem;

  /**
   * The constructor function initializes a player object with basic attributes and methods for
   * managing experience, stats, inventory, and leveling up.
   * @param {string} name - The `name` parameter is a string that represents the name of the player
   * character being created in the constructor function.
   */
  constructor(name: string, className: string) {
    const playerClass = PlayerClasses[className];
    if (!playerClass) throw new Error(`Invalid class: ${className}`);

    this.xpSystem = new XPSystem();
    this.player = {
      name,
      level: 1,
      experience: 0,
      stats: {
        ...playerClass.baseStats,
        maxHealth: playerClass.baseStats.health,
        maxMana: playerClass.baseStats.mana,
      },
      inventory: [],
      playerClass,
      addItem: this.addItem.bind(this),
      removeItem: this.removeItem.bind(this),
      levelUp: this.levelUp.bind(this),
      applyStatModifiers: this.applyStatModifiers.bind(this),
      addExperience: this.addExperience.bind(this),
    };
  }

  /**
   * The function `addItem` checks if an item already exists in the player's inventory and either
   * increases its quantity or adds it to the inventory.
   * @param {TInventoryItem} item - The `addItem` function takes an argument `item` of type
   * `TInventoryItem`. This argument represents an item that is being added to the player's inventory.
   */
  addItem(item: TInventoryItem) {
    const existingItem = this.player.inventory.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.player.inventory.push(item);
    }
  }

  /**
   * The function `removeItem` removes an item from the player's inventory based on the item's ID.
   * @param {string} itemId - The `itemId` parameter is a string that represents the unique identifier
   * of the item that needs to be removed from the player's inventory.
   */
  removeItem(itemId: string) {
    this.player.inventory = this.player.inventory.filter((item) => item.id !== itemId);
  }

  /**
   * The `levelUp` function increases the player's level, resets their experience, and upgrades their
   * stats based on the new level.
   */
  levelUp() {
    const { stats } = this.player;
    const { statGrowth } = this.player.playerClass
    this.player.level++;
    this.player.experience = 0;

    // Stat Increase on Level up
    stats.maxHealth += statGrowth.health;
    stats.maxMana += statGrowth.mana;
    stats.attack += statGrowth.attack;
    stats.defense += statGrowth.defense;

    stats.health = stats.maxHealth;
    stats.mana = stats.maxMana;

    console.log(`${this.player.name} leveled up to level ${this.player.level}!`);
  }

  /**
   * The function `addExperience` increases the player's experience points and checks if the player
   * levels up based on the experience gained.
   * @param {number} exp - The `exp` parameter in the `addExperience` function represents the amount of
   * experience points that will be added to the player's current experience.
   */
  addExperience(exp: number) {
    this.player.experience += exp;

    // Check if player levels up
    const requiredXP = this.xpSystem.calculateNextLevelXP(this.player.level);
    if (this.player.experience >= requiredXP) {
      this.levelUp();
      const leftoverXP = this.player.experience - requiredXP;
      this.addExperience(leftoverXP); // Carry over extra XP to the next level
    }
  }

  /**
   * The function `applyStatModifiers` modifies the player's stats based on the provided modifiers and
   * ensures health and mana do not exceed their maximum values.
   * @param {TStatModifiers} modifiers - TStatModifiers = {
   */
  applyStatModifiers(modifiers: TStatModifiers) {
    const { stats } = this.player;

    if (modifiers.attack) stats.attack += modifiers.attack;
    if (modifiers.defense) stats.defense += modifiers.defense;
    if (modifiers.health) stats.health += modifiers.health;
    if (modifiers.mana) stats.mana += modifiers.mana;

    stats.health = Math.min(stats.health, stats.maxHealth);
    stats.mana = Math.min(stats.mana, stats.maxMana);

    console.log(`Applied stat modifiers to ${this.player.name}`);
  }
}
