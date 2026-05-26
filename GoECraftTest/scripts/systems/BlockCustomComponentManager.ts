import { BlockComponentRegistry, PlayerPlaceBlockAfterEvent, StartupEvent } from "@minecraft/server";
import { BlockCustomComponent } from "../customComponents/baseClasses/BlockCustomComponent";
import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
import { PlayerManager } from "./PlayerManager";

export class BlockCustomComponentManager {
  constructor(private readonly playerManager: PlayerManager) {}

  private emptyFarmPlotComponent = new EmptyFarmPlotComponent();

  public onStartup(event: StartupEvent) {
    this.registerCustomComponents(event.blockComponentRegistry);
  }

  public onPlaceBlockGlobal(event: PlayerPlaceBlockAfterEvent) {
    if (event.block.getComponent(this.emptyFarmPlotComponent.getFullId())) {
      this.playerManager.addFarmPlotLocationToPlayer(event.player, event.block.location);
    }
  }

  private registerCustomComponents(blockComponentRegistry: BlockComponentRegistry) {
    this.registerCustomComponent(this.emptyFarmPlotComponent, blockComponentRegistry);
  }

  private registerCustomComponent(customComponent: BlockCustomComponent, componentRegistry: BlockComponentRegistry) {
    componentRegistry.registerCustomComponent(customComponent.getFullId(), customComponent);
  }
}
