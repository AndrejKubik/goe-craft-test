import { Player } from "@minecraft/server";
import { ActionFormResponse, ActionFormData } from "@minecraft/server-ui";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { WorldSettingsManager } from "../systems/WorldSettingsManager";
import { MessageUtility } from "../utilities/MessageUtility";

export class DebugTablet {
  constructor(private readonly worldSettingsManager: WorldSettingsManager) {
    this.show = this.show.bind(this);
    this.onSpeedCheatButtonClick = this.onSpeedCheatButtonClick.bind(this);
  }

  public async show(player: Player): Promise<void> {
    const speedCheatEnabled = this.worldSettingsManager.isSpeedCheatEnabled();
    let debugTablet: ActionFormResponse;

    try {
      debugTablet = await showActionForm(player, speedCheatEnabled);
    } catch (error) {
      return;
    }

    if (debugTablet.canceled) {
      return;
    }

    if (debugTablet.selection === 0) {
      this.onSpeedCheatButtonClick();
    }
  }

  private onSpeedCheatButtonClick() {
    this.worldSettingsManager.toggleSpeedCheatState();
  }
}

async function showActionForm(player: Player, speedCheatEnabled: boolean): Promise<ActionFormResponse> {
  const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
  const form = new ActionFormData().title("Debug Tablet").button(speedCheatButtonText);

  return await form.show(player);
}

function getSpeedCheatButtonText(speedCheatEnabled: boolean): string {
  const stateText = speedCheatEnabled
    ? MessageUtility.formatString("Enabled", MessageTextColor.DarkGreen)
    : MessageUtility.formatString("Disabled", MessageTextColor.Red);

  return `Speed Cheat : ${stateText}`;
}
