import { world } from "@minecraft/server";
import { PlantDefinitions } from "../data/blockCustomComponents/PlantDefinitions";
import { TimeUtility } from "../utilities/TimeUtility";
import { BlockUtility } from "../utilities/BlockUtility";
import { EntityIdUtility } from "../utilities/EntityIdUtility";
import { BlockPermutationStateKeys } from "../data/blockCustomComponents/BlockPermutationStateKeys";
export class PlantGrowthManager {
    constructor(playerManager) {
        this.playerManager = playerManager;
    }
    onTick() {
        for (const player of world.getPlayers()) {
            this.growPlayerPlants(player);
        }
    }
    growPlayerPlants(player) {
        const playerData = this.playerManager.getPlayerData(player.id);
        for (const plant of playerData.plants) {
            const plantDefinition = PlantDefinitions[plant.plantDefinitionKey];
            if (plant.growthStage >= plantDefinition.maxGrowthStage) {
                continue;
            }
            plant.ticksUntilNextStage--;
            if (plant.ticksUntilNextStage <= 0) {
                this.advancePlantStage(player, plant, plantDefinition);
            }
        }
    }
    advancePlantStage(player, plant, plantDefinition) {
        plant.growthStage++;
        plant.ticksUntilNextStage = TimeUtility.getTicks(plantDefinition.growthStageDuration);
        const block = player.dimension.getBlock(plant.blockLocation);
        if (block) {
            BlockUtility.setPermutationByIndex(block, EntityIdUtility.getFullId(BlockPermutationStateKeys.plantGrowth), plant.growthStage);
        }
    }
}
//# sourceMappingURL=PlantGrowthManager.js.map