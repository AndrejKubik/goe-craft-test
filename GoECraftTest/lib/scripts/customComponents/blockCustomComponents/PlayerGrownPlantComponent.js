import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { MathUtility } from "../../utilities/MathUtility";
import { TimeUtility } from "../../utilities/TimeUtility";
const vanillaBookId = "minecraft:book";
export class PlayerGrownPlantComponent extends BlockCustomComponent {
    constructor(playerManager) {
        super();
        this.playerManager = playerManager;
    }
    static getId() {
        return EntityIdUtility.getFullId("player_grown_plant");
    }
    onInteract(player, event) {
        const plantData = this.getPlantData(player, event.block);
        if (!plantData) {
            return; //this means player does not own the block
        }
        if (PlayerInventoryUtility.isPlayerHoldingItem(player, vanillaBookId)) {
            const currentGrowthStage = plantData.growthStage;
            const timeUntilNextGrowthStage = TimeUtility.ticksToSeconds(plantData.ticksUntilNextStage);
            player.onScreenDisplay.setActionBar(`Growth stage: ${currentGrowthStage} | Next stage in: ${timeUntilNextGrowthStage}`);
        }
    }
    getPlantData(player, block) {
        const playerData = this.playerManager.getPlayerData(player.id);
        const playerPlants = playerData.plants;
        for (const plant of playerPlants) {
            if (MathUtility.areVectorsEqual(plant.blockLocation, block.location)) {
                return plant;
            }
        }
        return null;
    }
}
//# sourceMappingURL=PlayerGrownPlantComponent.js.map