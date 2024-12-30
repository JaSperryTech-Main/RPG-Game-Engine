// XPSystem.ts

/* The `XPSystem` class in TypeScript manages experience points and calculates the experience points
required to reach the next level based on the current level. */
export class XPSystem {
  baseXP: number;

  /**
   * The constructor function initializes the baseXP property with a default value of 100 if no value
   * is provided.
   * @param {number} [baseXP=100] - The `baseXP` parameter in the constructor function is a number that
   * represents the base experience points value. If no value is provided when creating an instance of
   * the class, the default value is set to 100.
   */
  constructor(baseXP: number = 100) {
    this.baseXP = baseXP;
  }

  /**
   * The function calculates the experience points required to reach the next level based on the
   * current level.
   * @param {number} level - The `level` parameter in the `calculateNextLevelXP` function represents
   * the current level of a player or character in a game.
   * @returns The function `calculateNextLevelXP` is returning the next level's experience points based
   * on the input level. It calculates the experience points required for the next level by multiplying
   * the base experience points by the square of the input level.
   */
  calculateNextLevelXP(level: number): number {
    return this.baseXP * level ** 2;
  }
}
