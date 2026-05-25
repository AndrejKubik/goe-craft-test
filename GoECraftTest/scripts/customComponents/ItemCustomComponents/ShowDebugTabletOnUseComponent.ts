import { ItemComponentUseEvent } from "@minecraft/server";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { WorldSettingsManager } from "../../systems/WorldSettingsManager";
import { DebugTablet } from "../../ui/DebugTablet";
import { GameModeManager } from "../../systems/GameModeManager";

export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
  constructor(
    private readonly worldSettingsManager: WorldSettingsManager,
    private readonly gameModeManager: GameModeManager
  ) {
    super();
  }

  public getId(): string {
    return "show_debug_tablet_on_use";
  }

  public onUse(event: ItemComponentUseEvent): void {
    const player = event.source;
    const debugTablet = new DebugTablet(player, this.worldSettingsManager, this.gameModeManager);

    debugTablet.show();
  }
}
