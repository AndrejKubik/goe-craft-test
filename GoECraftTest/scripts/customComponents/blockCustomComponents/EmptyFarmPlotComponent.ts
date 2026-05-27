import { Block, BlockComponentPlayerInteractEvent, Player } from "@minecraft/server";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerManager } from "../../systems/PlayerManager";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { CustomBlockIds } from "../../data/idContainers/CustomBlockIds";
import { PlantDefinitions } from "../../data/blockCustomComponents/PlantDefinitions";
import { PlantDefinitionKeys } from "../../data/blockCustomComponents/PlantDefinitionKeys";
import { IPlantData } from "../../data/blockCustomComponents/IPlantData";
import { TimeUtility } from "../../utilities/TimeUtility";
import { BlockUtility } from "../../utilities/BlockUtility";
import { BlockPermutationStateKeys } from "../../data/blockCustomComponents/BlockPermutationStateKeys";
import { PlayerDataPersistenceManager } from "../../systems/PlayerDataPersistenceManager";

const tomatoSeedId = EntityIdUtility.getFullId(CustomItemIds.tomatoSeed);
const cucumberSeedId = EntityIdUtility.getFullId(CustomItemIds.cucumberSeed);

export class EmptyFarmPlotComponent extends BlockCustomComponent {
  constructor(private readonly playerManager: PlayerManager) {
    super();
  }

  public static getId(): string {
    return EntityIdUtility.getFullId("empty_farm_plot");
  }

  public onPlayerInteract(event: BlockComponentPlayerInteractEvent): void {
    const block = event.block;
    const player = event.player;

    if (!player || !this.playerManager.isFarmPlotOwnedByPlayer(block, player)) {
      return;
    }

    if (PlayerInventoryUtility.isPlayerHoldingItem(player, tomatoSeedId)) {
      this.plantSeed(player, block, PlantDefinitionKeys.tomato, CustomBlockIds.tomatoPlant);
    } else if (PlayerInventoryUtility.isPlayerHoldingItem(player, cucumberSeedId)) {
      this.plantSeed(player, block, PlantDefinitionKeys.cucumber, CustomBlockIds.cucumberPlant);
    }
  }

  /**plantBlockRawId - identifier without the "namespace_name:" part. */
  private plantSeed(player: Player, farmPlotBlock: Block, plantDefinitionKey: string, plantBlockRawId: string) {
    const plantBlock = farmPlotBlock.above();

    if (!plantBlock) {
      console.error("Cannot find the block data for block above the farm plot. Cannot plant seeds");

      return;
    }

    farmPlotBlock.setType(EntityIdUtility.getFullId(CustomBlockIds.usedFarmPlot));
    plantBlock.setType(EntityIdUtility.getFullId(plantBlockRawId));

    BlockUtility.setPermutationByIndex(plantBlock, EntityIdUtility.getFullId(BlockPermutationStateKeys.plantGrowth), 0);

    const plantDefinition = PlantDefinitions[plantDefinitionKey];

    if (!plantDefinition) {
      console.error(`Cannot plant seed, requested invalid plant definition: ${plantDefinitionKey}`);

      return;
    }

    const newPlantData: IPlantData = {
      plantDefinitionKey: plantDefinitionKey,
      blockLocation: plantBlock.location,
      growthStage: 0,
      ticksUntilNextStage: TimeUtility.getTicks(plantDefinition.growthStageDuration),
    };

    const playerData = this.playerManager.getPlayerData(player.id);
    const playerPlants = playerData.plants;

    playerPlants.push(newPlantData);
    PlayerDataPersistenceManager.setPlants(player, playerPlants);

    console.warn(`Planted seed: ${plantBlockRawId}`);
  }
}
