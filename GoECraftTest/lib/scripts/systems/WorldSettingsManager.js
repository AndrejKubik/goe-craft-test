import { world } from "@minecraft/server";
import { WorldDataPersistenceManager } from "./WorldDataPersistenceManager";
export class WorldSettingsManager {
    constructor() {
        this.speedCheatEnabled = false;
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
        const stateText = newState == true ? "enabled" : "disabled";
        world.sendMessage(`Speed cheat is now: ${stateText}.`);
    }
}
//# sourceMappingURL=WorldSettingsManager.js.map