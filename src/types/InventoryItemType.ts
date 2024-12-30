// InventoryItemType.ts

/**
 * The type TInventoryItem represents an inventory item with id, name, quantity, description, and
 * optional use function.
 * @property {string} id - The `id` property in the `TInventoryItem` type is a readonly string that
 * uniquely identifies an inventory item.
 * @property {string} name - The `name` property in the `TInventoryItem` type represents the name of
 * the inventory item. It is a required property and must be a string.
 * @property {number} quantity - The `quantity` property in the `TInventoryItem` type represents the
 * number of items available for that particular inventory item. It is a numeric value that indicates
 * how many of that item are currently in stock or available.
 * @property {string} description - The `description` property in the `TInventoryItem` type represents
 * a string that provides additional information or details about the inventory item. This property is
 * optional, indicated by the `?` symbol, which means it may or may not be present in an inventory item
 * object.
 * @property use - The `use` property in the `TInventoryItem` type is a function type that takes no
 * arguments and returns void. This property can be used to define a function that specifies the action
 * to be taken when the inventory item is used.
 */
export type TInventoryItem = {
  readonly id: string;
  name: string;
  quantity: number;
  description?: string;
  use?: () => void;
};
