import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
export class EmptyFarmPlotComponent extends BlockCustomComponent {
    constructor(playerManager) {
        super();
        this.playerManager = playerManager;
    }
    static getId() {
        return EntityIdUtility.getFullId("empty_farm_plot");
    }
    onPlace(event) { }
    onPlayerInteract(event) {
        const block = event.block;
        const player = event.player;
        if (!player) {
            return;
        }
        if (PlayerInventoryUtility.isPlayerHoldingItem(player, EntityIdUtility.getFullId(CustomItemIds.tomatoSeed))) {
            player.sendMessage("Holding tomato seed");
            block.setType("fruit_simulator:used_farm_plot");
        }
        else if (PlayerInventoryUtility.isPlayerHoldingItem(player, EntityIdUtility.getFullId(CustomItemIds.cucumberSeed))) {
            player.sendMessage("Holding cucumber seed");
            block.setType("fruit_simulator:used_farm_plot");
        }
    }
}
//# sourceMappingURL=EmptyFarmPlotComponent.js.map