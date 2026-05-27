import { Player, world } from "@minecraft/server";
import { PlayerManager } from "./PlayerManager";
import { PlantDefinitions } from "../data/blockCustomComponents/PlantDefinitions";
import { TimeUtility } from "../utilities/TimeUtility";
import { IPlantData } from "../data/blockCustomComponents/IPlantData";
import { IPlantDefinition } from "../data/blockCustomComponents/IPlantDefinition";

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

  private advancePlantStage(player: Player, plant: IPlantData, plantDefinition: IPlantDefinition) {
    plant.growthStage++;
    plant.ticksUntilNextStage = TimeUtility.getTicks(plantDefinition.growthStageDuration);

    const block = player.dimension.getBlock(plant.blockLocation);

    if (!block) {
      return;
    }

    block.setPermutation((block.permutation as any).withState("fruit_simulator:plant_growth", plant.growthStage));
  }
}
