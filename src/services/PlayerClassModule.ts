import { TPlayerClass } from "../types/PlayerClassType";

export const PlayerClasses: Record<string, TPlayerClass> = {
    Warrior: {
        name: "Warrior",
        description: "Strong melee fighter with high health and defense.",
        baseStats: { health: 150, mana: 20, attack: 15, defense: 10 },
        statGrowth: { health: 20, mana: 2, attack: 5, defense: 3 },
    },
    Mage: {
        name: "Mage",
        description: "Master of magic with powerful spells but low defense.",
        baseStats: { health: 80, mana: 120, attack: 25, defense: 5 },
        statGrowth: { health: 5, mana: 20, attack: 7, defense: 1 },
    },
    Rogue: {
        name: "Rogue",
        description: "Agile and stealthy, excels in critical strikes and evasion.",
        baseStats: { health: 100, mana: 50, attack: 20, defense: 8 },
        statGrowth: { health: 10, mana: 5, attack: 6, defense: 2 },
    },
};
