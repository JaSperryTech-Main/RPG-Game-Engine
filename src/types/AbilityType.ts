import { TEnemy } from "./EnemyType";
import { TPlayer } from "./PlayerType";

export type TAbility = {
    name: string;
    description: string;
    manaCost: number;
    execute: (player: TPlayer, target: TEnemy) => void;
}