export class PlayerInventoryUtility {
    static isPlayerHoldingItem(player, itemId) {
        const heldItemStack = this.getPlayerHeldItemStack(player);
        if (!heldItemStack) {
            return false;
        }
        return heldItemStack.typeId === itemId;
    }
    /**Checks whether the player is holding any of the items from the provided id values */
    static isPlayerHoldingItemAny(player, itemIds) {
        const heldItemStack = this.getPlayerHeldItemStack(player);
        if (!heldItemStack) {
            return false;
        }
        return itemIds.includes(heldItemStack.typeId);
    }
    static getPlayerHeldItemStack(player) {
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
//# sourceMappingURL=PlayerInventoryUtility.js.map