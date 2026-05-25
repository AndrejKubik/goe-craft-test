import { ItemComponentUseEvent, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { MessageUtility } from "../../utilities/MessageUtility";
import { MessageTextColor } from "../../data/messageUtility/MessageTextColor";
import { WorldSettingsManager } from "../../systems/WorldSettingsManager";
import { DebugTablet } from "../../ui/DebugTablet";

export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
  constructor(private readonly worldSettingsManager: WorldSettingsManager) {
    super();
  }

  public getId(): string {
    return "show_debug_tablet_on_use";
  }

  public onUse(event: ItemComponentUseEvent): void {
    const player = event.source;
    const debugTablet = new DebugTablet(this.worldSettingsManager);

    debugTablet.show(player);
  }
}
