// PlayerClassType.ts

export type TPlayerClass = {
    name: string;
    description: string;
    baseStats: {
        health: number;
        mana: number;
        attack: number;
        defense: number;
    }
    statGrowth: {
        health: number;
        mana: number;
        attack: number;
        defense: number;
    }
}