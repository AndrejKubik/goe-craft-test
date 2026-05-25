import { PlayerSaveKeys } from "../data/dataPersistence/PlayerSaveKeys";
export class PlayerDataPersistenceManager {
    static setVisitCount(player, value) {
        player.setDynamicProperty(PlayerSaveKeys.totalVisits, value);
    }
    static getVisitCount(player) {
        const property = player.getDynamicProperty(PlayerSaveKeys.totalVisits);
        if (property === undefined || typeof property !== "number") {
            return 0;
        }
        return property;
    }
    static setPlayTime(player, value) {
        player.setDynamicProperty(PlayerSaveKeys.playTime, value);
    }
    static getPlayerPlayTime(player) {
        const property = player.getDynamicProperty(PlayerSaveKeys.playTime);
        if (property === undefined || typeof property !== "number") {
            return 0;
        }
        return property;
    }
}
//# sourceMappingURL=PlayerDataPersistenceManager.js.map