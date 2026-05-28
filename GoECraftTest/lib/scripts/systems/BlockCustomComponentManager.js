import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
import { PlayerGrownPlantComponent } from "../customComponents/blockCustomComponents/PlayerGrownPlantComponent";
export class BlockCustomComponentManager {
    constructor(playerManager) {
        this.playerManager = playerManager;
    }
    onStartup(event) {
        this.registerCustomComponents(event.blockComponentRegistry);
    }
    registerCustomComponents(blockComponentRegistry) {
        blockComponentRegistry.registerCustomComponent(EmptyFarmPlotComponent.getId(), new EmptyFarmPlotComponent(this.playerManager));
        blockComponentRegistry.registerCustomComponent(PlayerGrownPlantComponent.getId(), new PlayerGrownPlantComponent(this.playerManager));
    }
}
//# sourceMappingURL=BlockCustomComponentManager.js.map