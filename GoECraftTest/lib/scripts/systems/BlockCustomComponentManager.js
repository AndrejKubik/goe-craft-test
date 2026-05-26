import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
export class BlockCustomComponentManager {
    constructor(playerManager) {
        this.playerManager = playerManager;
    }
    onStartup(event) {
        this.registerCustomComponents(event.blockComponentRegistry);
    }
    onPlaceBlockGlobal(event) {
        const block = event.block;
        if (block.getComponent(EmptyFarmPlotComponent.getId())) {
            this.playerManager.addFarmPlotBlockToPlayer(event.player, block);
        }
    }
    // public onInteractWithBlockGlobal(event: PlayerInteractWithBlockBeforeEvent) {}
    registerCustomComponents(blockComponentRegistry) {
        blockComponentRegistry.registerCustomComponent(EmptyFarmPlotComponent.getId(), new EmptyFarmPlotComponent(this.playerManager));
    }
}
//# sourceMappingURL=BlockCustomComponentManager.js.map