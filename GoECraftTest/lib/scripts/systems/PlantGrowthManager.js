import { world } from "@minecraft/server";
import { PlantDefinitions } from "../data/blockCustomComponents/PlantDefinitions";
import { TimeUtility } from "../utilities/TimeUtility";
import { BlockUtility } from "../utilities/BlockUtility";
import { EntityIdUtility } from "../utilities/EntityIdUtility";
import { BlockPermutationStateKeys } from "../data/blockCustomComponents/BlockPermutationStateKeys";
import { PlayerDataPersistenceManager } from "./PlayerDataPersistenceManager";
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
            const isGrowthStageChanged = this.growPlant(plant);
            const isPlantVisualsUpdated = this.syncPlantVisuals(player.dimension, plant);
            if (isGrowthStageChanged || isPlantVisualsUpdated) {
                PlayerDataPersistenceManager.setPlants(player, playerData.plants);
            }
        }
    }
    /**Returns true when the plant advances to the next growth stage*/
    growPlant(plant) {
        const plantDefinition = PlantDefinitions[plant.plantDefinitionKey];
        if (plant.growthStage >= plantDefinition.maxGrowthStage) {
            return false;
        }
        plant.ticksUntilNextStage--;
        if (plant.ticksUntilNextStage <= 0) {
            plant.growthStage++;
            plant.ticksUntilNextStage = TimeUtility.secondsToTicks(plantDefinition.growthStageDuration);
            return true;
        }
        return false;
    }
    /**Returns true when visuals get updated. */
    syncPlantVisuals(dimension, plant) {
        if (plant.growthStage === plant.growthStageVisual) {
            return false;
        }
        const block = dimension.getBlock(plant.blockLocation);
        if (!block) {
            return false;
        }
        BlockUtility.setPermutationByIndex(block, EntityIdUtility.getFullId(BlockPermutationStateKeys.plantGrowth), plant.growthStage);
        plant.growthStageVisual = plant.growthStage;
        return true;
    }
}
//# sourceMappingURL=PlantGrowthManager.js.map