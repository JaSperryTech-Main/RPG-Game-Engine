// CombatSystem.ts

import { RewardSystem } from "./RewardSystem";
import { TEnemy } from "../types/EnemyType";
import { TPlayer } from "../types/PlayerType";

export class CombatSystem {
    player: TPlayer;
    enemy: TEnemy;
    isPlayerTurn: boolean;
    maxTurns: number;
    currentTurn: number;

    constructor(player: TPlayer, enemy: TEnemy, maxTurns: number = 100) {
        this.player = player;
        this.enemy = enemy;
        this.isPlayerTurn = true;
        this.maxTurns = maxTurns;
        this.currentTurn = 0;
    }

    // Player Attacks Enemy
    attackEnemy() {
        const playerAttack = this.player.stats.attack;
        const enemyDefense = this.enemy.stats.defense;

        // Calculate Damage
        let damage = Math.max(playerAttack - enemyDefense, 1); // At least 1 damage
        const randomFactor = Math.random() * 0.2 + 0.9; // 10%-30% variation in damage
        damage = Math.floor(damage * randomFactor);

        this.enemy.stats.health -= damage;

        if (this.enemy.stats.health <= 0) this.enemy.stats.health = 0;

        console.log(`${this.player.name} attacks ${this.enemy.name} for ${damage} damage.`);
        console.log(`${this.enemy.name} has ${this.enemy.stats.health} health left.`);

        return this.enemy.stats.health <= 0;
    }

    // Enemy Attacks Player
    attackPlayer() {
        const enemyAttack = this.enemy.stats.attack;
        const playerDefense = this.player.stats.defense;

        // Calculate Damage
        let damage = Math.max(enemyAttack - playerDefense, 1); // At least 1 damage
        const randomFactor = Math.random() * 0.2 + 0.9; // 10%-30% variation in damage
        damage = Math.floor(damage * randomFactor);

        this.player.stats.health -= damage;

        if (this.player.stats.health <= 0) this.player.stats.health = 0;

        console.log(`${this.enemy.name} attacks ${this.player.name} for ${damage} damage.`);
        console.log(`${this.player.name} has ${this.player.stats.health} health left.`);

        return this.player.stats.health <= 0;
    }

    // Reward the player if they win
    rewardPlayer() {
        console.log(`${this.player.name} has won the battle! Collecting rewards...`);
        RewardSystem.applyRewards(this.player, this.enemy);
    }

    // Handle the end of the battle
    endBattle(winner: "player" | "enemy" | "draw") {
        if (winner === "player") {
            this.rewardPlayer();
        } else if (winner === "enemy") {
            console.log(`${this.player.name} was defeated by ${this.enemy.name}.`);
        } else {
            console.log("Battle ended in a draw - maximum turns reached.");
        }
        console.log("Battle has ended.");
    }

    // Process the combat loop
    processTurn() {
        this.currentTurn++;
        
        if (this.currentTurn > this.maxTurns) {
            this.endBattle("draw");
            return true;
        }

        if (this.isPlayerTurn) {
            const playerWon = this.attackEnemy();
            if (playerWon) {
                this.endBattle("player");
                return true;
            }
        } else {
            const enemyWon = this.attackPlayer();
            if (enemyWon) {
                this.endBattle("enemy");
                return true;
            }
        }

        this.isPlayerTurn = !this.isPlayerTurn;
        return false;
    }

    // Start the Battle
    startBattle(): "player" | "enemy" | "draw" {
        console.log(`Battle started between ${this.player.name} and ${this.enemy.name}`);
        console.log(`--- ${this.player.name} (Health: ${this.player.stats.health}) vs ${this.enemy.name} (Health: ${this.enemy.stats.health}) ---`);

        while (this.player.stats.health > 0 && this.enemy.stats.health > 0 && this.currentTurn < this.maxTurns) {
            const battleEnded = this.processTurn();
            if (battleEnded) break;
        }

        if (this.currentTurn >= this.maxTurns) return "draw";
        return this.player.stats.health <= 0 ? "enemy" : "player";
    }
}