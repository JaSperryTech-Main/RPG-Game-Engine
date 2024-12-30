// XPSystem.ts

export class XPSystem {
  baseXP: number;

  constructor(baseXP: number = 100) {
    this.baseXP = baseXP;
  }

  calculateNextLevelXP(level: number): number {
    return this.baseXP * level ** 2;
  }
}
