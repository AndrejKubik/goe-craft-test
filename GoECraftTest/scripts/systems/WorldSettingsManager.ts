import { world } from "@minecraft/server";
import { WorldDataPersistenceManager } from "./WorldDataPersistenceManager";

export class WorldSettingsManager {
  constructor() {
    this.onStartup = this.onStartup.bind(this);
    this.isSpeedCheatEnabled = this.isSpeedCheatEnabled.bind(this);
    this.toggleSpeedCheatState = this.toggleSpeedCheatState.bind(this);
    this.enableSpeedCheat = this.enableSpeedCheat.bind(this);
  }

  private speedCheatEnabled = false;

  public onStartup() {
    this.speedCheatEnabled = WorldDataPersistenceManager.getSpeedCheatEnabled();
  }

  public isSpeedCheatEnabled(): boolean {
    return this.speedCheatEnabled;
  }

  public toggleSpeedCheatState(): void {
    this.enableSpeedCheat(!this.isSpeedCheatEnabled());
  }

  public enableSpeedCheat(newState: boolean): void {
    this.speedCheatEnabled = newState;

    WorldDataPersistenceManager.setSpeedCheatEnabled(newState);

    const stateText = newState == true ? "enabled" : "disabled";

    world.sendMessage(`Speed cheat is now: ${stateText}.`);
  }
}
