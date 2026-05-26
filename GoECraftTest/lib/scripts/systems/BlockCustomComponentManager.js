import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
export class BlockCustomComponentManager {
    constructor(playerManager) {
        this.playerManager = playerManager;
        this.emptyFarmPlotComponent = new EmptyFarmPlotComponent(this.playerManager);
    }
    onStartup(event) {
        this.registerCustomComponents(event.blockComponentRegistry);
    }
    onPlaceBlockGlobal(event) {
        const block = event.block;
        if (block.getComponent(this.emptyFarmPlotComponent.getFullId())) {
            this.playerManager.addFarmPlotBlockToPlayer(event.player, block);
        }
    }
    onInteractWithBlockGlobal(event) { }
    registerCustomComponents(blockComponentRegistry) {
        this.registerCustomComponent(this.emptyFarmPlotComponent, blockComponentRegistry);
    }
    registerCustomComponent(customComponent, componentRegistry) {
        componentRegistry.registerCustomComponent(customComponent.getFullId(), customComponent);
    }
}
//# sourceMappingURL=BlockCustomComponentManager.js.map