// StatsType.ts

/**
 * The type TStats defines the properties related to health, mana, attack, and defense for a character
 * in a game.
 * @property {number} health - The `health` property represents the current health points of a
 * character or entity.
 * @property {number} maxHealth - The `maxHealth` property in the `TStats` type represents the maximum
 * health points that a character or entity can have. It defines the upper limit of the health
 * attribute, indicating the highest amount of health the entity can possess.
 * @property {number} mana - The `mana` property in the `TStats` type represents the current amount of
 * mana that a character or entity has. Mana is typically used to cast spells or use special abilities
 * in games or other applications.
 * @property {number} maxMana - The `maxMana` property in the `TStats` type represents the maximum
 * amount of mana that a character or entity can have. It defines the upper limit of the mana resource
 * that can be stored or regenerated for use in abilities or spells.
 * @property {number} attack - The `attack` property in the `TStats` type represents the amount of
 * damage a character can deal in combat. It typically indicates the strength or offensive capability
 * of the character.
 * @property {number} defense - The `defense` property in the `TStats` type represents the defense stat
 * of a character or entity in a game. It typically indicates how much damage the character can
 * mitigate or resist when being attacked by an opponent.
 */
export type TStats = {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
};

/**
 * The type TStatModifiers defines optional numeric modifiers for health, attack, defense, and mana
 * stats.
 * @property {number} health - The `health` property in the `TStatModifiers` type represents a
 * numerical value that modifies the health stat of a character or entity in a game or application.
 * This modifier can be used to increase or decrease the health points of the character based on the
 * specified value.
 * @property {number} attack - The `attack` property in the `TStatModifiers` type represents a
 * numerical value that modifies the attack stat of a character or entity in a game. It can be used to
 * increase or decrease the attack power of the entity based on the value provided.
 * @property {number} defense - The `defense` property in the `TStatModifiers` type represents a
 * numerical value that modifies the defense attribute of a character or entity in a game. It can be
 * used to increase or decrease the defense stat of the entity, affecting how much damage it takes from
 * incoming attacks.
 * @property {number} mana - The `mana` property in the `TStatModifiers` type represents a numerical
 * value that modifies the mana attribute of a character or entity in a game. It can be used to
 * increase or decrease the amount of mana available to the character, affecting their ability to use
 * magical abilities or skills.
 */
export type TStatModifiers = {
  health?: number;
  attack?: number;
  defense?: number;
  mana?: number;
};
