import { BlockComponentRegistry, PlayerPlaceBlockAfterEvent, StartupEvent } from "@minecraft/server";
import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";
import { PlayerManager } from "./PlayerManager";
import { PlayerGrownPlantComponent } from "../customComponents/blockCustomComponents/PlayerGrownPlantComponent";

export class BlockCustomComponentManager {
  constructor(private readonly playerManager: PlayerManager) {}

  public onStartup(event: StartupEvent) {
    this.registerCustomComponents(event.blockComponentRegistry);
  }

  private registerCustomComponents(blockComponentRegistry: BlockComponentRegistry) {
    blockComponentRegistry.registerCustomComponent(
      EmptyFarmPlotComponent.getId(),
      new EmptyFarmPlotComponent(this.playerManager)
    );

    blockComponentRegistry.registerCustomComponent(
      PlayerGrownPlantComponent.getId(),
      new PlayerGrownPlantComponent(this.playerManager)
    );
  }
}
