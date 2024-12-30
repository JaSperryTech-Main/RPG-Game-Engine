import { RewardSystem } from "./RewardSystem";
import { TEnemy } from "../types/EnemyType";
import { TPlayer } from "../types/PlayerType";

/* The `CombatSystem` class in TypeScript manages a turn-based battle system between a player and an
enemy, handling attacks, health calculations, and battle outcomes. */
export class CombatSystem {
    player: TPlayer;
    enemy: TEnemy;
    isPlayerTurn: boolean;
    maxTurns: number;
    currentTurn: number;

    /**
     * This TypeScript constructor initializes a game with a player, an enemy, and a maximum number of
     * turns.
     * @param {TPlayer} player - The `player` parameter in the constructor is of type `TPlayer`, which
     * likely represents the player character in a game or simulation. It is used to initialize the
     * `player` property of the class instance.
     * @param {TEnemy} enemy - The `enemy` parameter in the constructor represents the opponent or
     * adversary that the player will be facing in the game or battle. It could be an AI-controlled
     * character, a boss, or any other entity that the player needs to defeat or overcome.
     * @param {number} [maxTurns=100] - The `maxTurns` parameter in the constructor represents the
     * maximum number of turns allowed in the game. By default, it is set to 100 if no value is
     * provided when creating an instance of the class.
     */
    constructor(player: TPlayer, enemy: TEnemy, maxTurns: number = 100) {
        this.player = player;
        this.enemy = enemy;
        this.isPlayerTurn = true;
        this.maxTurns = maxTurns;
        this.currentTurn = 0;
    }

    /**
     * The `attackEnemy` function calculates damage based on player and enemy stats, reduces enemy
     * health, and returns a boolean indicating if the enemy has been defeated.
     * @returns The `attackEnemy()` function returns a boolean value indicating whether the enemy's
     * health has reached 0 or below after the attack. If the enemy's health is 0 or below, it returns
     * `true`, otherwise it returns `false`.
     */
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

    /**
     * The function "attackPlayer" calculates damage inflicted by an enemy on a player in a game
     * scenario and updates the player's health accordingly.
     * @returns The `attackPlayer()` function is returning a boolean value indicating whether the
     * player's health has fallen to or below 0 after being attacked by the enemy. If the player's
     * health is 0 or less, the function returns `true`, otherwise it returns `false`.
     */
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

    /**
     * The `rewardPlayer` function logs a message indicating that the player has won the battle and
     * then applies rewards using the `RewardSystem` for the player and enemy involved.
     */
    rewardPlayer() {
        console.log(`${this.player.name} has won the battle! Collecting rewards...`);
        RewardSystem.applyRewards(this.player, this.enemy);
    }

    /**
     * The function `endBattle` determines the outcome of a battle and provides appropriate messages
     * based on the winner or if it ended in a draw.
     * @param {"player" | "enemy" | "draw"} winner - The `endBattle` function takes a `winner`
     * parameter, which can have one of three possible values: "player", "enemy", or "draw". This
     * parameter indicates the outcome of the battle - whether the player wins, the enemy wins, or the
     * battle ends in a draw.
     */
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

    /**
     * The function `processTurn` increments the current turn, checks for battle end conditions,
     * alternates between player and enemy turns, and returns a boolean indicating if the battle has
     * ended.
     * @returns The `processTurn()` function returns a boolean value - `true` if the battle has ended
     * (either in a draw, player victory, or enemy victory) and `false` if the battle is still ongoing.
     */
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

    /**
     * The function `startBattle` initiates a battle between a player and an enemy, processing turns
     * until one side's health reaches zero or the maximum turn limit is reached, returning the outcome
     * as "player", "enemy", or "draw".
     * @returns The function `startBattle()` returns either "player" if the player wins the battle,
     * "enemy" if the enemy wins the battle, or "draw" if the battle ends in a draw.
     */
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