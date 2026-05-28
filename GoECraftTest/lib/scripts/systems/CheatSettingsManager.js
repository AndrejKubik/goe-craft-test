import { world } from "@minecraft/server";
import { WorldDataPersistenceUtility } from "./WorldDataPersistenceUtility";
/**Handles cheat settings */
export class CheatSettingsManager {
    constructor() {
        this.speedCheatEnabled = false;
    }
    onStartup() {
        this.speedCheatEnabled = WorldDataPersistenceUtility.getSpeedCheatEnabled();
    }
    isSpeedCheatEnabled() {
        return this.speedCheatEnabled;
    }
    enableSpeedCheat(newState) {
        if (newState === this.speedCheatEnabled) {
            return;
        }
        this.speedCheatEnabled = newState;
        WorldDataPersistenceUtility.setSpeedCheatEnabled(newState);
        const stateText = newState == true ? "enabled" : "disabled";
        world.sendMessage(`Speed cheat is now: ${stateText}.`);
    }
}
//# sourceMappingURL=CheatSettingsManager.js.map