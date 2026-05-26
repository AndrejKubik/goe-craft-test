export class PlayerInventoryUtility {
    static isPlayerHoldingItem(player, itemId) {
        const playerInventory = player.getComponent("inventory");
        if (!playerInventory) {
            console.error("Failed to find player inventory.");
            return false;
        }
        const container = playerInventory.container;
        if (!container) {
            console.error("Failed to find player inventory container.");
            return false;
        }
        const heldItemStack = container.getItem(player.selectedSlotIndex);
        if (!heldItemStack) {
            return false;
        }
        return heldItemStack.typeId === itemId;
    }
}
//# sourceMappingURL=PlayerInventoryUtility.js.map