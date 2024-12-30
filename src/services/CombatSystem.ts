import { Abilities } from './AbilityModule';
import { RewardSystem } from './RewardSystem';
import { TAbility } from '../types/AbilityType';
import { TEnemy } from '../types/EnemyType';
import { TPlayer } from '../types/PlayerType';

export class CombatSystem {
  player: TPlayer;
  enemy: TEnemy;
  isPlayerTurn: boolean;

  constructor(player: TPlayer, enemy: TEnemy) {
    this.player = player;
    this.enemy = enemy;
    this.isPlayerTurn = true;
  }

  chooseplayerAction(action: 'attack' | string) {
    if (action === 'attack') {
      return this.attackEnemy();
    } else {
      const ability = Abilities[this.player.playerClass.name].find((a) => a.name === action);
      if (!ability) {
        console.log('Invalid Ability');
        return false;
      }
      return this.useAbility(ability);
    }
  }

  useAbility(ability: TAbility) {
    if (this.player.stats.mana < ability.manaCost) {
      console.log(`${this.player.name} does not have enough mana to use ${ability.name}!`);
      return false;
    }

    this.player.stats.mana -= ability.manaCost;
    ability.execute(this.player, this.enemy);

    if (this.enemy.stats.health <= 0) {
      this.enemy.stats.health = 0;
      console.log(`${this.enemy.name} is defeated!`);
      return true;
    }

    return false;
  }

  attackEnemy() {
    const playerAttack = this.player.stats.attack;
    const enemyDefense = this.enemy.stats.defense;

    let damage = Math.max(playerAttack - enemyDefense, 1); // At least 1 damage
    const randomFactor = Math.random() * 0.2 + 0.9; // 10%-30% variation
    damage = Math.floor(damage * randomFactor);

    this.enemy.stats.health -= damage;
    if (this.enemy.stats.health <= 0) this.enemy.stats.health = 0;

    console.log(`${this.player.name} attacks ${this.enemy.name} for ${damage} damage.`);
    console.log(`${this.enemy.name} has ${this.enemy.stats.health} health left.`);

    if (this.enemy.stats.health <= 0) {
      console.log(`${this.enemy.name} is defeated!`);
      return true; // Player wins
    }

    return false; // Continue battle
  }

  attackPlayer() {
    const enemyAttack = this.enemy.stats.attack;
    const playerDefense = this.player.stats.defense;

    let damage = Math.max(enemyAttack - playerDefense, 1); // At least 1 damage
    const randomFactor = Math.random() * 0.2 + 0.9; // 10%-30% variation
    damage = Math.floor(damage * randomFactor);

    this.player.stats.health -= damage;
    if (this.player.stats.health <= 0) this.player.stats.health = 0;

    console.log(`${this.enemy.name} attacks ${this.player.name} for ${damage} damage.`);
    console.log(`${this.player.name} has ${this.player.stats.health} health left.`);

    if (this.player.stats.health <= 0) {
      console.log(`${this.player.name} is defeated!`);
      return true; // Enemy wins
    }

    return false; // Continue battle
  }

  processTurn(action?: string) {
    if (this.isPlayerTurn) {
      // Player's action (attack or ability)
      const playerWon = this.chooseplayerAction(action || 'attack');
      if (playerWon) {
        console.log('Player wins!');
        this.rewardPlayer();
        return;
      }
    } else {
      // Enemy's action
      const enemyWon = this.attackPlayer();
      if (enemyWon) {
        console.log('Enemy wins!');
        return;
      }
    }

    // Switch Turns
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  // Reward Player
  rewardPlayer() {
    RewardSystem.applyRewards(this.player, this.enemy);
  }

  startBattle() {
    console.log(`Battle started between ${this.player.name} and ${this.enemy.name}`);

    while (this.player.stats.health > 0 && this.enemy.stats.health > 0) {
      if (this.isPlayerTurn) {
        console.log("It's your turn! Choose an action:");
        console.log('1. Attack');
        Abilities[this.player.playerClass.name].forEach((ability, index) => {
          console.log(`${index + 2}. ${ability.name} (${ability.manaCost} Mana)`);
        });

        const playerAction = 'attack'; // Replace with user input logic
        this.processTurn(playerAction);
      } else {
        this.processTurn();
      }
    }
  }
}
