import { Block, BlockComponentPlayerInteractEvent, Player } from "@minecraft/server";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerManager } from "../../systems/PlayerManager";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { IPlantData } from "../../data/blockCustomComponents/IPlantData";
import { MathUtility } from "../../utilities/MathUtility";
import { TimeUtility } from "../../utilities/TimeUtility";

const vanillaBookId = "minecraft:book";

export class PlayerGrownPlantComponent extends BlockCustomComponent {
  constructor(private readonly playerManager: PlayerManager) {
    super();
  }

  public static getId(): string {
    return EntityIdUtility.getFullId("player_grown_plant");
  }

  public onInteract(player: Player, event: BlockComponentPlayerInteractEvent): void {
    const plantData = this.getPlantData(player, event.block);

    if (!plantData) {
      return; //this means player does not own the block
    }

    if (PlayerInventoryUtility.isPlayerHoldingItem(player, vanillaBookId)) {
      const currentGrowthStage = plantData.growthStage;
      const timeUntilNextGrowthStage = TimeUtility.ticksToSeconds(plantData.ticksUntilNextStage);

      player.onScreenDisplay.setActionBar(
        `Growth stage: ${currentGrowthStage} | Next stage in: ${timeUntilNextGrowthStage}`
      );
    }
  }

  private getPlantData(player: Player, block: Block): IPlantData | null {
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
