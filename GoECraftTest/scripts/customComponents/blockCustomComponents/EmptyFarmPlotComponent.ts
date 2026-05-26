import { BlockComponentOnPlaceEvent, BlockComponentPlayerInteractEvent } from "@minecraft/server";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerManager } from "../../systems/PlayerManager";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";

export class EmptyFarmPlotComponent extends BlockCustomComponent {
  constructor(private readonly playerManager: PlayerManager) {
    super();
  }

  public static getId(): string {
    return EntityIdUtility.getFullId("empty_farm_plot");
  }

  public onPlace(event: BlockComponentOnPlaceEvent): void {}

  public onPlayerInteract(event: BlockComponentPlayerInteractEvent): void {
    const block = event.block;
    const player = event.player;

    if (!player) {
      return;
    }
    if (PlayerInventoryUtility.isPlayerHoldingItem(player, EntityIdUtility.getFullId(CustomItemIds.tomatoSeed))) {
      player.sendMessage("Holding tomato seed");
      block.setType("fruit_simulator:used_farm_plot");
    } else if (
      PlayerInventoryUtility.isPlayerHoldingItem(player, EntityIdUtility.getFullId(CustomItemIds.cucumberSeed))
    ) {
      player.sendMessage("Holding cucumber seed");
      block.setType("fruit_simulator:used_farm_plot");
    }
  }
}
