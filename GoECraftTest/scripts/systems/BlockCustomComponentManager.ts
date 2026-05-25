import { BlockComponentRegistry, StartupEvent } from "@minecraft/server";
import { BlockCustomComponent } from "../customComponents/baseClasses/BlockCustomComponent";
import { EmptyFarmPlotComponent } from "../customComponents/blockCustomComponents/EmptyFarmPlotComponent";

export class BlockCustomComponentManager {
  public onStartup(event: StartupEvent) {
    this.registerCustomComponents(event.blockComponentRegistry);
  }

  private registerCustomComponents(blockComponentRegistry: BlockComponentRegistry) {
    this.registerCustomComponent(new EmptyFarmPlotComponent(), blockComponentRegistry);
  }

  private registerCustomComponent(customComponent: BlockCustomComponent, componentRegistry: BlockComponentRegistry) {
    componentRegistry.registerCustomComponent(customComponent.getFullId(), customComponent);
  }
}
