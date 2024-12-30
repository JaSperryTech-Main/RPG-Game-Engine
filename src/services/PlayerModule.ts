// PlayerModule.ts

import { XPSystem } from './XPSystem';
import { TInventoryItem } from '../types/InventoryItemType';
import { TPlayer } from '../types/PlayerType';
import { TStatModifiers } from '../types/StatsType';

export class PlayerModule {
  player: TPlayer;
  xpSystem: XPSystem;

  constructor(name: string) {
    this.xpSystem = new XPSystem();
    this.player = {
      name,
      level: 1,
      experience: 0,
      stats: {
        health: 100,
        maxHealth: 100,
        mana: 50,
        maxMana: 50,
        attack: 10,
        defense: 5,
      },
      inventory: [],
      addItem: this.addItem.bind(this),
      removeItem: this.removeItem.bind(this),
      levelUp: this.levelUp.bind(this),
      applyStatModifiers: this.applyStatModifiers.bind(this),
      addExperience: this.addExperience.bind(this),
    };
  }

  addItem(item: TInventoryItem) {
    const existingItem = this.player.inventory.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.player.inventory.push(item);
    }
  }

  removeItem(itemId: string) {
    this.player.inventory = this.player.inventory.filter((item) => item.id !== itemId);
  }

  levelUp() {
    const { stats } = this.player;
    this.player.level++;
    this.player.experience = 0;

    // Stat Increase on Level up
    stats.maxHealth += 10 + this.player.level * 2;
    stats.maxMana += 5 + this.player.level;
    stats.health = stats.maxHealth;
    stats.mana = stats.maxMana;
    stats.attack += 2;
    stats.defense += 1;
    console.log(`${this.player.name} leveled up to level ${this.player.level}!`);
  }

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
