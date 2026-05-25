import { world } from "@minecraft/server";
import { WorldDataPersistenceManager } from "./WorldDataPersistenceManager";
export class WorldSettingsManager {
    constructor() {
        this.speedCheatEnabled = false;
        this.onStartup = this.onStartup.bind(this);
        this.isSpeedCheatEnabled = this.isSpeedCheatEnabled.bind(this);
        this.toggleSpeedCheatState = this.toggleSpeedCheatState.bind(this);
        this.enableSpeedCheat = this.enableSpeedCheat.bind(this);
    }
    onStartup() {
        this.speedCheatEnabled = WorldDataPersistenceManager.getSpeedCheatEnabled();
    }
    isSpeedCheatEnabled() {
        return this.speedCheatEnabled;
    }
    toggleSpeedCheatState() {
        this.enableSpeedCheat(!this.isSpeedCheatEnabled());
    }
    enableSpeedCheat(newState) {
        this.speedCheatEnabled = newState;
        WorldDataPersistenceManager.setSpeedCheatEnabled(newState);
        const stateText = newState == true ? "enabled" : "disabled";
        world.sendMessage(`Speed cheat is now: ${stateText}.`);
    }
}
//# sourceMappingURL=WorldSettingsManager.js.map