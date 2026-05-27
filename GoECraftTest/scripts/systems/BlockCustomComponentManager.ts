import {
  BlockComponentRegistry,
  PlayerInteractWithBlockBeforeEvent,
  PlayerPlaceBlockAfterEvent,
  StartupEvent,
} from "@minecraft/server";
import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
import { PlayerManager } from "./PlayerManager";
import { PlayerGrownPlantComponent } from "../customComponents/blockCustomComponents/PlayerGrownPlantComponent";

export class BlockCustomComponentManager {
  constructor(private readonly playerManager: PlayerManager) {}

  public onStartup(event: StartupEvent) {
    this.registerCustomComponents(event.blockComponentRegistry);
  }

  public onPlaceBlockGlobal(event: PlayerPlaceBlockAfterEvent) {
    const block = event.block;

    if (block.getComponent(EmptyFarmPlotComponent.getId())) {
      this.playerManager.addFarmPlotBlockToPlayer(event.player, block);
    }
  }

  private registerCustomComponents(blockComponentRegistry: BlockComponentRegistry) {
    blockComponentRegistry.registerCustomComponent(
      EmptyFarmPlotComponent.getId(),
      new EmptyFarmPlotComponent(this.playerManager)
    );

    blockComponentRegistry.registerCustomComponent(PlayerGrownPlantComponent.getId(), new PlayerGrownPlantComponent());
  }
}
