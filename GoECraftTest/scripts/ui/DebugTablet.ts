import { Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { WorldSettingsManager } from "../systems/WorldSettingsManager";
import { MessageUtility } from "../utilities/MessageUtility";
import { GameModeManager } from "../systems/GameModeManager";

export class DebugTablet {
  constructor(
    private readonly worldSettingsManager: WorldSettingsManager
    // private readonly gameModeManager: GameModeManager
  ) {}

  public async show(player: Player): Promise<void> {
    const speedCheatEnabled = this.worldSettingsManager.isSpeedCheatEnabled();
    let debugTablet: ModalFormResponse;

    try {
      debugTablet = await showModelForm(player, speedCheatEnabled);
    } catch (error) {
      return;
    }

    if (debugTablet.canceled) {
      return;
    }

    this.onSubmit(debugTablet.formValues);
  }

  private onSubmit(modalFormValues: (string | number | boolean | undefined)[] | undefined) {
    if (modalFormValues === undefined) {
      console.error("Invalid modal form data provided for debug tablet.");
      return;
    }

    this.worldSettingsManager.enableSpeedCheat(modalFormValues[0] as boolean);
  }
}

async function showModelForm(player: Player, speedCheatEnabled: boolean): Promise<ModalFormResponse> {
  const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
  const form = new ModalFormData()
    .title("Debug Tablet")
    .toggle(speedCheatButtonText, { defaultValue: speedCheatEnabled })
    .dropdown("Game Mode", ["Enforced Survival", "Enforced Adventure", "Free"], { defaultValueIndex: 0 });

  return await form.show(player);
}

function getSpeedCheatButtonText(speedCheatEnabled: boolean): string {
  const stateText = "Speed cheat enabled";

  return speedCheatEnabled
    ? MessageUtility.formatString(stateText, MessageTextColor.DarkGreen)
    : MessageUtility.formatString(stateText, MessageTextColor.Red);
}
