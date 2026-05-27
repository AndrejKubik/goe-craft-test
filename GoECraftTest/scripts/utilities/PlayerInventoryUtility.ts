import { ItemStack, Player } from "@minecraft/server";

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

  private static getPlayerHeldItemStack(player: Player): ItemStack | undefined {
    const playerInventory = player.getComponent("inventory");

    if (!playerInventory) {
      console.error("Failed to find player inventory.");

      return undefined;
    }

    const container = playerInventory.container;

    if (!container) {
      console.error("Failed to find player inventory container.");

      return undefined;
    }

    return container.getItem(player.selectedSlotIndex);
  }
}
