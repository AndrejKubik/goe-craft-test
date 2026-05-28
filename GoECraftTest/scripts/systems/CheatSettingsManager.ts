import { world } from "@minecraft/server";
import { WorldDataPersistenceUtility } from "./WorldDataPersistenceUtility";

/**Handles cheat settings */
export class CheatSettingsManager {
  private speedCheatEnabled = false;

  public onStartup() {
    this.speedCheatEnabled = WorldDataPersistenceUtility.getSpeedCheatEnabled();
  }

  public isSpeedCheatEnabled(): boolean {
    return this.speedCheatEnabled;
  }

  public enableSpeedCheat(newState: boolean): void {
    if (newState === this.speedCheatEnabled) {
      return;
    }

    this.speedCheatEnabled = newState;

    WorldDataPersistenceUtility.setSpeedCheatEnabled(newState);

    const stateText = newState == true ? "enabled" : "disabled";

    world.sendMessage(`Speed cheat is now: ${stateText}.`);
  }
}
