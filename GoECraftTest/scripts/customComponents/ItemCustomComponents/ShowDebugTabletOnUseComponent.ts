import { ItemComponentUseEvent, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { MessageUtility } from "../../utilities/MessageUtility";
import { MessageTextColor } from "../../data/messageUtility/MessageTextColor";
import { WorldDataPersistanceManager } from "../../systems/WorldDataPersistanceManager";

const speedCheatPropertyId = "DEBUG_SPEED_CHEAT";

export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
  getId(): string {
    return "show_debug_tablet_on_use";
  }

  public onUse(event: ItemComponentUseEvent): void {
    showDebugTablet(event.source);
  }
}

async function showDebugTablet(player: Player): Promise<void> {
  const speedCheatEnabled = WorldDataPersistanceManager.getSpeedCheatEnabled();
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
    onSpeedCheatButtonClick(speedCheatEnabled);
  }
}

async function showDebugTabletForm(player: Player, speedCheatEnabled: boolean): Promise<ActionFormResponse> {
  const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
  const form = new ActionFormData().title("Debug Tablet").button(speedCheatButtonText);

  return await form.show(player);
}

function onSpeedCheatButtonClick(speedCheatEnabled: boolean): void {
  WorldDataPersistanceManager.setSpeedCheatEnabled(!speedCheatEnabled);
}

function getSpeedCheatButtonText(speedCheatEnabled: boolean): string {
  const stateText = speedCheatEnabled
    ? MessageUtility.formatString("Enabled", MessageTextColor.DarkGreen)
    : MessageUtility.formatString("Disabled", MessageTextColor.Red);

  return `Speed Cheat : ${stateText}`;
}
