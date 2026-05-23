import { PlayerSaveKeys } from "../data/dataPersistence/PlayerSaveKeys";
export class PlayerDataPersistenceManager {
    static setVisitCount(player, value) {
        player.setDynamicProperty(PlayerSaveKeys.totalVisits, value);
    }
    static getVisitCount(player) {
        const property = player.getDynamicProperty(PlayerSaveKeys.totalVisits);
        return property !== undefined ? property : 0;
    }
    static setPlayTime(player, value) {
        player.setDynamicProperty(PlayerSaveKeys.playTime, value);
    }
    static getPlayerPlayTime(player) {
        const property = player.getDynamicProperty(PlayerSaveKeys.playTime);
        return property !== undefined ? property : 0;
    }
}
//# sourceMappingURL=PlayerDataPersistenceManager.js.map