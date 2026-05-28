import { ItemStack } from "@minecraft/server";
/**Helper for player inventory operations*/
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
    static addItemToPlayer(player, itemId, amount) {
        const inventoryContainer = this.getPlayerInventoryContainer(player);
        if (!inventoryContainer) {
            console.error("Failed to access player inventory.");
            return false;
        }
        const itemStack = new ItemStack(itemId, amount);
        return inventoryContainer.addItem(itemStack) === undefined;
    }
    static getPlayerHeldItemStack(player) {
        const container = this.getPlayerInventoryContainer(player);
        if (!container) {
            console.error("Failed to find player inventory container.");
            return undefined;
        }
        return container.getItem(player.selectedSlotIndex);
    }
    static getPlayerInventoryContainer(player) {
        const playerInventory = player.getComponent("inventory");
        if (!playerInventory) {
            console.error("Failed to find player inventory.");
            return undefined;
        }
        return playerInventory.container;
    }
}
//# sourceMappingURL=PlayerInventoryUtility.js.map