import { world } from "@minecraft/server";
import { WorldSaveKeys } from "../data/player/WorldSaveKeys";
export class WorldDataPersistanceManager {
    static setSpeedCheatEnabled(newState) {
        world.setDynamicProperty(WorldSaveKeys.speedCheatEnabled, newState);
    }
    static getSpeedCheatEnabled() {
        const property = world.getDynamicProperty(WorldSaveKeys.speedCheatEnabled);
        return property !== undefined && property;
    }
}
//# sourceMappingURL=WorldDataPersistanceManager.js.map