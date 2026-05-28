import { Container, ItemStack, Player } from "@minecraft/server";

/**Helper for player inventory operations*/
export class PlayerInventoryUtility {
  public static isPlayerHoldingItem(player: Player, itemId: string): boolean {
    const heldItemStack = this.getPlayerHeldItemStack(player);

    if (!heldItemStack) {
      return false;
    }

    return heldItemStack.typeId === itemId;
  }

  /**Checks whether the player is holding any of the items from the provided id values */
  public static isPlayerHoldingItemAny(player: Player, itemIds: string[]): boolean {
    const heldItemStack = this.getPlayerHeldItemStack(player);

    if (!heldItemStack) {
      return false;
    }

    return itemIds.includes(heldItemStack.typeId);
  }

  public static addItemToPlayer(player: Player, itemId: string, amount: number): boolean {
    const inventoryContainer = this.getPlayerInventoryContainer(player);

    if (!inventoryContainer) {
      console.error("Failed to access player inventory.");

      return false;
    }

    const itemStack = new ItemStack(itemId, amount);

    return inventoryContainer.addItem(itemStack) === undefined;
  }

  private static getPlayerHeldItemStack(player: Player): ItemStack | undefined {
    const container = this.getPlayerInventoryContainer(player);

    if (!container) {
      console.error("Failed to find player inventory container.");

      return undefined;
    }

    return container.getItem(player.selectedSlotIndex);
  }

  private static getPlayerInventoryContainer(player: Player): Container | undefined {
    const playerInventory = player.getComponent("inventory");

    if (!playerInventory) {
      console.error("Failed to find player inventory.");

      return undefined;
    }

    return playerInventory.container;
  }
}
