// InventoryItemType.ts

// Define Type for Inventory Item Structure
export type TInventoryItem = {
  readonly id: string;
  name: string;
  quantity: number;
  description?: string;
  use?: () => void;
};
