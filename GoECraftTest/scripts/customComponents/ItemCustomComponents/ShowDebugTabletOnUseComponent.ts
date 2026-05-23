import { ItemComponentUseEvent, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { MessageUtility } from "../../utilities/MessageUtility";
import { MessageTextColor } from "../../data/messageUtility/MessageTextColor";

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
  let speedCheatEnabled = getSpeedCheatEnabled();
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
    speedCheatEnabled = !speedCheatEnabled;

    world.setDynamicProperty(speedCheatPropertyId, speedCheatEnabled);
  }
}

async function showDebugTabletForm(player: Player, speedCheatEnabled: boolean): Promise<ActionFormResponse> {
  const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
  const form = new ActionFormData().title("Debug Tablet").button(speedCheatButtonText);

  return await form.show(player);
}

function getSpeedCheatEnabled(): boolean {
  const property = world.getDynamicProperty(speedCheatPropertyId);

  return property !== undefined && (property as boolean);
}

function getSpeedCheatButtonText(speedCheatEnabled: boolean): string {
  const stateText = speedCheatEnabled
    ? MessageUtility.formatString("Enabled", MessageTextColor.DarkGreen)
    : MessageUtility.formatString("Disabled", MessageTextColor.Red);

  return `Speed Cheat : ${stateText}`;
}
