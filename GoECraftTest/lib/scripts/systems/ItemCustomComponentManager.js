import { DashOnUseComponent } from "../customComponents/ItemCustomComponents/DashOnUseComponent";
import { ShowDebugTabletOnUseComponent } from "../customComponents/ItemCustomComponents/ShowDebugTabletOnUseComponent";
export class ItemCustomComponentManager {
    constructor() {
        this.dashOnUseComponent = new DashOnUseComponent();
        this.showDebugTabletOnUseComponent = new ShowDebugTabletOnUseComponent();
        this.modifiedVanillaItems = new Map();
    }
    onStartup(event) {
        this.registerItemCustomComponents(event.itemComponentRegistry);
        this.registerVanillaItemCustomComponents();
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
    registerVanillaItemCustomComponents() {
        this.addCustomComponentsToItem("minecraft:iron_sword", [this.dashOnUseComponent]);
    }
    registerItemCustomComponents(itemComponentRegistry) {
        itemComponentRegistry.registerCustomComponent(this.dashOnUseComponent.getFullId(), this.dashOnUseComponent);
    }
    addCustomComponentsToItem(itemId, components) {
        this.modifiedVanillaItems.set(itemId, components);
    }
}
//# sourceMappingURL=ItemCustomComponentManager.js.map