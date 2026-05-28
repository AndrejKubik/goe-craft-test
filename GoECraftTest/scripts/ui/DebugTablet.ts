import { Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { WorldSettingsManager } from "../systems/WorldSettingsManager";
import { MessageUtility } from "../utilities/MessageUtility";
import { GameModeManager } from "../systems/GameModeManager";
import { PlayerDataPersistenceManager } from "../systems/PlayerDataPersistenceManager";
import { WorldDataPersistenceManager } from "../systems/WorldDataPersistenceManager";

export class DebugTablet {
  constructor(
    private readonly player: Player,
    private readonly worldSettingsManager: WorldSettingsManager,
    private readonly gameModeManager: GameModeManager
  ) {}

  public async show(): Promise<void> {
    let debugTablet: ModalFormResponse;

    try {
      debugTablet = await this.showModalForm();
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
    this.gameModeManager.setEnforcedGameMode(modalFormValues[1] as number);

    if (modalFormValues[4] === true) {
      PlayerDataPersistenceManager.clearAllProperties(this.player);
    }

    if (modalFormValues[5] === true) {
      WorldDataPersistenceManager.clearAllProperties();
    }
  }

  private async showModalForm(): Promise<ModalFormResponse> {
    const form = new ModalFormData()
      .title("Debug Tablet")
      .toggle(this.getSpeedCheatToggleLabel(), {
        defaultValue: this.worldSettingsManager.isSpeedCheatEnabled(),
      })
      .dropdown("Game Mode", ["Enforced Survival", "Enforced Adventure", "Free"], {
        defaultValueIndex: this.gameModeManager.getCurrentEnforcedMode(),
      })
      .divider()
      .label("use [/reload all] right after using these two for expected behavior!")
      .toggle("Clear player dynamic properties")
      .toggle("Clear world dynamic properties");

    return await form.show(this.player);
  }

  private getSpeedCheatToggleLabel(): string {
    const stateText = "Speed cheat enabled";

    return this.worldSettingsManager.isSpeedCheatEnabled()
      ? MessageUtility.formatString(stateText, MessageTextColor.DarkGreen)
      : MessageUtility.formatString(stateText, MessageTextColor.Red);
  }
}
