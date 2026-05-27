import { Dimension, Player, world } from "@minecraft/server";
import { PlayerManager } from "./PlayerManager";
import { PlantDefinitions } from "../data/blockCustomComponents/PlantDefinitions";
import { TimeUtility } from "../utilities/TimeUtility";
import { IPlantData } from "../data/blockCustomComponents/IPlantData";
import { BlockUtility } from "../utilities/BlockUtility";
import { EntityIdUtility } from "../utilities/EntityIdUtility";
import { BlockPermutationStateKeys } from "../data/blockCustomComponents/BlockPermutationStateKeys";
import { PlayerDataPersistenceManager } from "./PlayerDataPersistenceManager";

export class PlantGrowthManager {
  constructor(private readonly playerManager: PlayerManager) {}

  public onTick() {
    for (const player of world.getPlayers()) {
      this.growPlayerPlants(player);
    }
  }

  private growPlayerPlants(player: Player) {
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
  private growPlant(plant: IPlantData): boolean {
    const plantDefinition = PlantDefinitions[plant.plantDefinitionKey];

    if (plant.growthStage >= plantDefinition.maxGrowthStage) {
      return false;
    }

    plant.ticksUntilNextStage--;

    if (plant.ticksUntilNextStage <= 0) {
      plant.growthStage++;
      plant.ticksUntilNextStage = TimeUtility.secondsToTicks(plantDefinition.growthStageDuration);

      console.warn("Plant advanced growth state.");
      return true;
    }

    return false;
  }

  /**Returns true when visuals get updated. */
  private syncPlantVisuals(dimension: Dimension, plant: IPlantData): boolean {
    if (plant.growthStage === plant.growthStageVisual) {
      return false;
    }

    const block = dimension.getBlock(plant.blockLocation);

    if (!block) {
      return false;
    }

    BlockUtility.setPermutationByIndex(
      block,
      EntityIdUtility.getFullId(BlockPermutationStateKeys.plantGrowth),
      plant.growthStage
    );

    plant.growthStageVisual = plant.growthStage;

    console.warn("Plant visuals updated.");
    return true;
  }
}
