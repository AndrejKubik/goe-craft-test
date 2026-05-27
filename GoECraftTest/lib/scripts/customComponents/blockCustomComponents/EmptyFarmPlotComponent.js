import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { CustomBlockIds } from "../../data/idContainers/CustomBlockIds";
import { PlantDefinitions } from "../../data/blockCustomComponents/PlantDefinitions";
import { PlantDefinitionKeys } from "../../data/blockCustomComponents/PlantDefinitionKeys";
import { TimeUtility } from "../../utilities/TimeUtility";
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
            this.plantSeed(player, block, PlantDefinitionKeys.tomato, CustomBlockIds.tomatoPlant);
        }
        else if (PlayerInventoryUtility.isPlayerHoldingItem(player, cucumberSeedId)) {
            this.plantSeed(player, block, PlantDefinitionKeys.cucumber, CustomBlockIds.cucumberPlant);
        }
    }
    /**plantBlockRawId - identifier without the "namespace_name:" part. */
    plantSeed(player, farmPlotBlock, plantDefinitionKey, plantBlockRawId) {
        const plantBlock = farmPlotBlock.above();
        if (!plantBlock) {
            console.error("Cannot find the block data for block above the farm plot. Cannot plant seeds");
            return;
        }
        farmPlotBlock.setType(EntityIdUtility.getFullId(CustomBlockIds.usedFarmPlot));
        plantBlock.setType(EntityIdUtility.getFullId(plantBlockRawId));
        const plantGrowthState = "fruit_simulator:plant_growth";
        plantBlock.setPermutation(plantBlock.permutation.withState(plantGrowthState, 0));
        const plantDefinition = PlantDefinitions[plantDefinitionKey];
        const plantData = {
            plantId: plantDefinitionKey,
            blockLocation: plantBlock.location,
            growthStage: 0,
            stageGrowTime: Date.now() + TimeUtility.getMiliseconds(plantDefinition.growthStageDuration),
        };
        const playerData = this.playerManager.getPlayerData(player.id);
        playerData.plants.push(plantData);
        console.warn(`Planted seed: ${plantBlockRawId}`);
    }
}
//# sourceMappingURL=EmptyFarmPlotComponent.js.map