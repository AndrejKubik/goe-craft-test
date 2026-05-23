import { WorldDataPersistenceManager } from "./WorldDataPersistenceManager";

export class WorldSettingsManager {
  constructor() {
    this.onStartup = this.onStartup.bind(this);
    this.isSpeedCheatEnabled = this.isSpeedCheatEnabled.bind(this);
    this.enableSpeedCheat = this.enableSpeedCheat.bind(this);
  }

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
  }
}
