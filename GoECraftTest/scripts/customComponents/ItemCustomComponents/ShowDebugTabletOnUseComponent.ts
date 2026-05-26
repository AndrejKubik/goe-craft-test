import { ItemComponentUseEvent } from "@minecraft/server";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { WorldSettingsManager } from "../../systems/WorldSettingsManager";
import { DebugTablet } from "../../ui/DebugTablet";
import { GameModeManager } from "../../systems/GameModeManager";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";

export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
  constructor(
    private readonly worldSettingsManager: WorldSettingsManager,
    private readonly gameModeManager: GameModeManager
  ) {
    super();
  }

  public static getId(): string {
    return EntityIdUtility.getFullId("show_debug_tablet_on_use");
  }

  public onUse(event: ItemComponentUseEvent): void {
    const player = event.source;
    const debugTablet = new DebugTablet(player, this.worldSettingsManager, this.gameModeManager);

    debugTablet.show();
  }
}
