import { TEnemy } from '../types/EnemyType';
import { TInventoryItem } from '../types/InventoryItemType';

export const handleInventory = {
  addItem(enemy: TEnemy, item: TInventoryItem): void {
    const existingItem = enemy.inventory.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      enemy.inventory.push(item);
    }
  },

  removeItem(enemy: TEnemy, itemId: string): void {
    enemy.inventory = enemy.inventory.filter((item) => item.id !== itemId);
  },
};
