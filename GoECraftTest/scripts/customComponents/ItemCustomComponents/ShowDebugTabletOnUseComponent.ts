import { ItemComponentUseEvent, Player } from "@minecraft/server";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";

export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
  getId(): string {
    return "show_debug_tablet_on_use";
  }

  public onUse(event: ItemComponentUseEvent): void {
    showDebugTablet(event.source);
  }
}

function showDebugTablet(player: Player) {
  player.sendMessage("Debug tablet");
}
