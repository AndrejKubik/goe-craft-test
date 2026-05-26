import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { CustomBlockIds } from "../../data/idContainers/CustomBlockIds";
const tomatoSeedId = EntityIdUtility.getFullId(CustomItemIds.tomatoSeed);
const cucumberSeedId = EntityIdUtility.getFullId(CustomItemIds.cucumberSeed);
export class EmptyFarmPlotComponent extends BlockCustomComponent {
    constructor(playerManager) {
        super();
        this.playerManager = playerManager;
    }
    static getId() {
        return EntityIdUtility.getFullId("empty_farm_plot");
    }
    onPlayerInteract(event) {
        const block = event.block;
        const player = event.player;
        if (!player || !this.playerManager.isFarmPlotOwnedByPlayer(block, player)) {
            return;
        }
        if (PlayerInventoryUtility.isPlayerHoldingItem(player, tomatoSeedId)) {
            console.warn("Planted tomato seed");
            block.setType(EntityIdUtility.getFullId(CustomBlockIds.usedFarmPlot));
        }
        else if (PlayerInventoryUtility.isPlayerHoldingItem(player, cucumberSeedId)) {
            console.warn("Planted cucumber seed");
            block.setType(EntityIdUtility.getFullId(CustomBlockIds.usedFarmPlot));
        }
    }
}
//# sourceMappingURL=EmptyFarmPlotComponent.js.map