import { BlockComponentOnPlaceEvent } from "@minecraft/server";
import { CustomComponent } from "./CustomComponent";

export abstract class BlockCustomComponent extends CustomComponent {
  constructor() {
    super();

    this.onPlace = this.onPlace.bind(this);
  }

  public onPlace(event: BlockComponentOnPlaceEvent): void {}
}
