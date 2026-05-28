import { DashOnUseComponent } from "../customComponents/ItemCustomComponents/DashOnUseComponent";
import { ShowDebugTabletOnUseComponent } from "../customComponents/ItemCustomComponents/ShowDebugTabletOnUseComponent";
/**Handles registration of custom item components and adding their effects to vanilla items as well */
export class ItemCustomComponentManager {
    constructor(worldSettingsManager, gameModeManager) {
        this.worldSettingsManager = worldSettingsManager;
        this.gameModeManager = gameModeManager;
        this.modifiedVanillaItems = new Map();
    }
    onStartup(event) {
        this.registerItemCustomComponents(event.itemComponentRegistry);
        this.addCustomComponentsToVanillaItems();
    }
    onUseItem(event) {
        const itemId = event.itemStack.typeId;
        const itemComponents = this.modifiedVanillaItems.get(itemId);
        if (!itemComponents) {
            return;
        }
        for (const component of itemComponents) {
            component.onUseVanilla(event);
        }
    }
    addCustomComponentsToVanillaItems() {
        this.addCustomComponentsToItem("minecraft:iron_sword", [new DashOnUseComponent(this.worldSettingsManager)]);
    }
    addCustomComponentsToItem(itemId, components) {
        this.modifiedVanillaItems.set(itemId, components);
    }
    registerItemCustomComponents(itemComponentRegistry) {
        itemComponentRegistry.registerCustomComponent(ShowDebugTabletOnUseComponent.getId(), new ShowDebugTabletOnUseComponent(this.worldSettingsManager, this.gameModeManager));
    }
}
//# sourceMappingURL=ItemCustomComponentManager.js.map