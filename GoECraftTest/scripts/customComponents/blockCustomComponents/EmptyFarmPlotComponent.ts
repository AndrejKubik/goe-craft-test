import { BlockComponentOnPlaceEvent, world } from "@minecraft/server";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";

export class EmptyFarmPlotComponent extends BlockCustomComponent {
  public getId(): string {
    return "empty_farm_plot";
  }

  public onPlace(event: BlockComponentOnPlaceEvent): void {}
}
