import { world } from "@minecraft/server";
import { WorldDataPersistenceManager } from "./WorldDataPersistenceManager";

export class WorldSettingsManager {
  private speedCheatEnabled = false;

  public onStartup() {
    this.speedCheatEnabled = WorldDataPersistenceManager.getSpeedCheatEnabled();
  }

  public isSpeedCheatEnabled(): boolean {
    return this.speedCheatEnabled;
  }

  public enableSpeedCheat(newState: boolean): void {
    this.speedCheatEnabled = newState;

    WorldDataPersistenceManager.setSpeedCheatEnabled(newState);

    const stateText = newState == true ? "enabled" : "disabled";

    world.sendMessage(`Speed cheat is now: ${stateText}.`);
  }
}
