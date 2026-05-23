import { world } from "@minecraft/server";
import { WorldSaveKeys } from "../data/dataPersistence/WorldSaveKeys";
export class WorldDataPersistenceManager {
    static setSpeedCheatEnabled(newState) {
        world.setDynamicProperty(WorldSaveKeys.speedCheatEnabled, newState);
    }
    static getSpeedCheatEnabled() {
        const property = world.getDynamicProperty(WorldSaveKeys.speedCheatEnabled);
        return property !== undefined && property;
    }
}
//# sourceMappingURL=WorldDataPersistenceManager.js.map