import { ItemComponentUseEvent, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { MessageUtility } from "../../utilities/MessageUtility";
import { MessageTextColor } from "../../data/messageUtility/MessageTextColor";
import { WorldDataPersistenceManager } from "../../systems/WorldDataPersistenceManager";
import { WorldSettingsManager } from "../../systems/WorldSettingsManager";

const speedCheatPropertyId = "DEBUG_SPEED_CHEAT";

export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
  constructor(private readonly worldSettingsManager: WorldSettingsManager) {
    super();
  }

  public getId(): string {
    return "show_debug_tablet_on_use";
  }

  public onUse(event: ItemComponentUseEvent): void {
    showDebugTablet(event.source, this.worldSettingsManager);
  }
}

async function showDebugTablet(player: Player, worldSettingsManager: WorldSettingsManager): Promise<void> {
  const speedCheatEnabled = worldSettingsManager.isSpeedCheatEnabled();
  let debugTablet: ActionFormResponse;

  try {
    debugTablet = await showDebugTabletForm(player, speedCheatEnabled);
  } catch (error) {
    return;
  }

  if (debugTablet.canceled) {
    return;
  }

  if (debugTablet.selection === 0) {
    onSpeedCheatButtonClick(worldSettingsManager);
  }
}

async function showDebugTabletForm(player: Player, speedCheatEnabled: boolean): Promise<ActionFormResponse> {
  const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
  const form = new ActionFormData().title("Debug Tablet").button(speedCheatButtonText);

  return await form.show(player);
}

function onSpeedCheatButtonClick(worldSettingsManager: WorldSettingsManager): void {
  worldSettingsManager.enableSpeedCheat(!worldSettingsManager.isSpeedCheatEnabled());
}

function getSpeedCheatButtonText(speedCheatEnabled: boolean): string {
  const stateText = speedCheatEnabled
    ? MessageUtility.formatString("Enabled", MessageTextColor.DarkGreen)
    : MessageUtility.formatString("Disabled", MessageTextColor.Red);

  return `Speed Cheat : ${stateText}`;
}
