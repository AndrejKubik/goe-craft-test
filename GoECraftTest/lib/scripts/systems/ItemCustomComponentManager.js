import { DashOnUseComponent } from "../customComponents/ItemCustomComponents/DashOnUseComponent";
import { ShowDebugTabletOnUseComponent } from "../customComponents/ItemCustomComponents/ShowDebugTabletOnUseComponent";
export class ItemCustomComponentManager {
    constructor(worldSettingsManager) {
        this.worldSettingsManager = worldSettingsManager;
        this.modifiedVanillaItems = new Map();
    }
    onStartup(event) {
        registerItemCustomComponents(event.itemComponentRegistry, this.worldSettingsManager);
        addCustomComponentsToVanillaItems(this.modifiedVanillaItems, this.worldSettingsManager);
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
}
function addCustomComponentsToVanillaItems(modifiedVanillaItems, worldSettingsManager) {
    addCustomComponentsToItem("minecraft:iron_sword", [new DashOnUseComponent(worldSettingsManager)], modifiedVanillaItems);
}
function addCustomComponentsToItem(itemId, components, modifiedVanillaItems) {
    modifiedVanillaItems.set(itemId, components);
}
function registerItemCustomComponents(itemComponentRegistry, worldSettingsManager) {
    registerCustomComponent(new ShowDebugTabletOnUseComponent(worldSettingsManager), itemComponentRegistry);
}
function registerCustomComponent(customComponent, itemComponentRegistry) {
    itemComponentRegistry.registerCustomComponent(customComponent.getFullId(), customComponent);
}
//# sourceMappingURL=ItemCustomComponentManager.js.map