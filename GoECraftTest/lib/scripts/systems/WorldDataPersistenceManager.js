import { world } from "@minecraft/server";
import { WorldSaveKeys } from "../data/dataPersistence/WorldSaveKeys";
import { EnforcedGameMode } from "../data/dataPersistence/EnforcedGameMode";
export class WorldDataPersistenceManager {
    static setSpeedCheatEnabled(newState) {
        world.setDynamicProperty(WorldSaveKeys.speedCheatEnabled, newState);
    }
    static getSpeedCheatEnabled() {
        const property = world.getDynamicProperty(WorldSaveKeys.speedCheatEnabled);
        if (property === undefined || typeof property !== "boolean") {
            return false;
        }
        return property;
    }
    static setEnforcedGameMode(gameMode) {
        world.setDynamicProperty(WorldSaveKeys.enforcedGameMode, gameMode.toString());
    }
    static getEnforcedGameMode() {
        const property = world.getDynamicProperty(WorldSaveKeys.enforcedGameMode);
        if (property === undefined || typeof property !== "string") {
            return EnforcedGameMode.Free;
        }
        return property;
    }
}
//# sourceMappingURL=WorldDataPersistenceManager.js.map