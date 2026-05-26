import { BlockComponentPlayerInteractEvent } from "@minecraft/server";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerManager } from "../../systems/PlayerManager";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { CustomBlockIds } from "../../data/idContainers/CustomBlockIds";

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
      console.warn("Planted tomato seed");
      block.setType(EntityIdUtility.getFullId(CustomBlockIds.usedFarmPlot));
    } else if (PlayerInventoryUtility.isPlayerHoldingItem(player, cucumberSeedId)) {
      console.warn("Planted cucumber seed");
      block.setType(EntityIdUtility.getFullId(CustomBlockIds.usedFarmPlot));
    }
  }
}
