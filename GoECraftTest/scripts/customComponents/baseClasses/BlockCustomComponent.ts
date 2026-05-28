import {
  BlockComponentOnPlaceEvent,
  BlockComponentPlayerBreakEvent,
  BlockComponentPlayerInteractEvent,
  BlockComponentPlayerPlaceBeforeEvent,
  Player,
} from "@minecraft/server";
import { CustomComponent } from "./CustomComponent";

export abstract class BlockCustomComponent extends CustomComponent {
  constructor() {
    super();

    this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
    this.onPlayerBreak = this.onPlayerBreak.bind(this);
  }

  protected onPlayerPlace(player: Player, event: BlockComponentPlayerPlaceBeforeEvent): void {}
  protected onInteract(player: Player, event: BlockComponentPlayerInteractEvent): void {}
  protected onBreak(player: Player, event: BlockComponentPlayerBreakEvent): void {}

  /**Do not override this on child classes, override onPlayerPlace() instead */
  public beforeOnPlayerPlace(event: BlockComponentPlayerPlaceBeforeEvent): void {
    const player = event.player;

    if (player) {
      this.onPlayerPlace(player, event);
    }
  }

  /**Do not override this on child classes, override onInteract() instead */
  public onPlayerInteract(event: BlockComponentPlayerInteractEvent): void {
    const player = event.player;

    if (player) {
      this.onInteract(player, event);
    }
  }

  /**Do not override this on child classes, override onBreak() instead */
  public onPlayerBreak(event: BlockComponentPlayerBreakEvent): void {
    const player = event.player;

    if (player) {
      this.onBreak(player, event);
    }
  }
}
