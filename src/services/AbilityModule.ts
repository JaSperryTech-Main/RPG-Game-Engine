import { TAbility } from "../types/AbilityType";
import { TEnemy } from "../types/EnemyType";
import { TPlayer } from "../types/PlayerType";

export const Abilities: Record<string, TAbility[]> = {
    Warrior: [
        {
            name: "Shield Bash",
            description: "Deals moderate damage and stuns the enemy.",
            manaCost: 10,
            execute: (player: TPlayer, target: TEnemy) => {
                const damage = player.stats.attack * 1.2 - target.stats.defense;
                target.stats.health -= Math.max(damage, 1);
                console.log(`${player.name} used Shield Bash on ${target.name}!`);
            },
        },
    ],
    Mage: [
        {
            name: "Fireball",
            description: "Deals heavy damage to the enemy.",
            manaCost: 20,
            execute: (player: TPlayer, target: TEnemy) => {
                const damage = player.stats.attack * 2 - target.stats.defense;
                target.stats.health -= Math.max(damage, 1);
                console.log(`${player.name} cast Fireball on ${target.name}!`);
            },
        },
    ],
    Rogue: [
        {
            name: "Backstab",
            description: "Deals critical damage when used from stealth.",
            manaCost: 15,
            execute: (player: TPlayer, target: TEnemy) => {
                const damage = player.stats.attack * 2.5 - target.stats.defense;
                target.stats.health -= Math.max(damage, 1);
                console.log(`${player.name} used Backstab on ${target.name}!`);
            },
        },
    ],
}