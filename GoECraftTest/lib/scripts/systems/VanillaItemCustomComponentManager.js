import { DashOnUseComponent } from "../customComponents/ItemCustomComponents/DashOnUseComponent";
export class VanillaItemCustomComponentManager {
    constructor() {
        this.dashOnUseComponent = new DashOnUseComponent();
        this.modifiedItems = new Map();
        this.addCustomComponentsToItem("minecraft:iron_sword", [this.dashOnUseComponent]);
    }
    onUseItem(event) {
        const itemId = event.itemStack.typeId;
        const itemComponents = this.modifiedItems.get(itemId);
        if (!itemComponents) {
            return;
        }
        for (const component of itemComponents) {
            component.onUseVanilla(event);
        }
    }
    addCustomComponentsToItem(itemId, components) {
        this.modifiedItems.set(itemId, components);
    }
}
//# sourceMappingURL=VanillaItemCustomComponentManager.js.map