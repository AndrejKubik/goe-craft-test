import { BlockComponentOnPlaceEvent, BlockComponentPlayerInteractEvent } from "@minecraft/server";
import { CustomComponent } from "./CustomComponent";

export abstract class BlockCustomComponent extends CustomComponent {
  constructor() {
    super();

    this.onPlace = this.onPlace.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  public onPlace(event: BlockComponentOnPlaceEvent): void {}
  public onPlayerInteract(event: BlockComponentPlayerInteractEvent): void {}
}
