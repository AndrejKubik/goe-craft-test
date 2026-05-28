import {
  BlockComponentOnPlaceEvent,
  BlockComponentPlayerBreakEvent,
  BlockComponentPlayerInteractEvent,
  Player,
} from "@minecraft/server";
import { CustomComponent } from "./CustomComponent";

export abstract class BlockCustomComponent extends CustomComponent {
  constructor() {
    super();

    this.onPlace = this.onPlace.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
    this.onPlayerBreak = this.onPlayerBreak.bind(this);
  }

  public onPlace(event: BlockComponentOnPlaceEvent): void {}

  /**Do not override this on child classes, override onInteract() instead */
  public onPlayerInteract(event: BlockComponentPlayerInteractEvent): void {
    const player = event.player;

    if (player) {
      this.onInteract(player, event);
    }
  }

  protected onInteract(player: Player, event: BlockComponentPlayerInteractEvent): void {}

  /**Do not override this on child classes, override onBreak() instead */
  public onPlayerBreak(event: BlockComponentPlayerBreakEvent): void {
    const player = event.player;

    if (player) {
      this.onBreak(player, event);
    }
  }

  protected onBreak(player: Player, event: BlockComponentPlayerBreakEvent): void {}
}
