import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
export class BlockCustomComponentManager {
    constructor(playerManager) {
        this.playerManager = playerManager;
        this.emptyFarmPlotComponent = new EmptyFarmPlotComponent();
    }
    onStartup(event) {
        this.registerCustomComponents(event.blockComponentRegistry);
    }
    onPlaceBlockGlobal(event) {
        if (event.block.getComponent(this.emptyFarmPlotComponent.getFullId())) {
            this.playerManager.addFarmPlotLocationToPlayer(event.player, event.block.location);
        }
    }
    registerCustomComponents(blockComponentRegistry) {
        this.registerCustomComponent(this.emptyFarmPlotComponent, blockComponentRegistry);
    }
    registerCustomComponent(customComponent, componentRegistry) {
        componentRegistry.registerCustomComponent(customComponent.getFullId(), customComponent);
    }
}
//# sourceMappingURL=BlockCustomComponentManager.js.map