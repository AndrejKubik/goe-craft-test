import { WorldDataPersistenceManager } from "./WorldDataPersistenceManager";
export class WorldSettingsManager {
    constructor() {
        this.speedCheatEnabled = false;
        this.onStartup = this.onStartup.bind(this);
        this.isSpeedCheatEnabled = this.isSpeedCheatEnabled.bind(this);
        this.enableSpeedCheat = this.enableSpeedCheat.bind(this);
    }
    onStartup() {
        this.speedCheatEnabled = WorldDataPersistenceManager.getSpeedCheatEnabled();
    }
    isSpeedCheatEnabled() {
        return this.speedCheatEnabled;
    }
    enableSpeedCheat(newState) {
        this.speedCheatEnabled = newState;
        WorldDataPersistenceManager.setSpeedCheatEnabled(newState);
    }
}
//# sourceMappingURL=WorldSettingsManager.js.map