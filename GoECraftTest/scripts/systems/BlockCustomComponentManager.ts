import { BlockComponentRegistry, PlayerPlaceBlockAfterEvent, StartupEvent } from "@minecraft/server";
import { BlockCustomComponent } from "../customComponents/baseClasses/BlockCustomComponent";
import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
import { PlayerManager } from "./PlayerManager";

export class BlockCustomComponentManager {
  constructor(private readonly playerManager: PlayerManager) {}

  private readonly emptyFarmPlotComponent = new EmptyFarmPlotComponent();

  public onStartup(event: StartupEvent) {
    this.registerCustomComponents(event.blockComponentRegistry);
  }

  public onPlaceBlockGlobal(event: PlayerPlaceBlockAfterEvent) {
    const block = event.block;

    if (block.getComponent(this.emptyFarmPlotComponent.getFullId())) {
      this.playerManager.addFarmPlotBlockToPlayer(event.player, block);
    }
  }

  private registerCustomComponents(blockComponentRegistry: BlockComponentRegistry) {
    this.registerCustomComponent(this.emptyFarmPlotComponent, blockComponentRegistry);
  }

  private registerCustomComponent(customComponent: BlockCustomComponent, componentRegistry: BlockComponentRegistry) {
    componentRegistry.registerCustomComponent(customComponent.getFullId(), customComponent);
  }
}
