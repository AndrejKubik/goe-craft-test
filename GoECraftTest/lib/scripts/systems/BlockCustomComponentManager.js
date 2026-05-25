import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
export class BlockCustomComponentManager {
    onStartup(event) {
        this.registerCustomComponents(event.blockComponentRegistry);
    }
    registerCustomComponents(blockComponentRegistry) {
        this.registerCustomComponent(new EmptyFarmPlotComponent(), blockComponentRegistry);
    }
    registerCustomComponent(customComponent, componentRegistry) {
        componentRegistry.registerCustomComponent(customComponent.getFullId(), customComponent);
    }
}
//# sourceMappingURL=BlockCustomComponentManager.js.map