import { PlayerSaveKeys } from "../data/dataPersistence/PlayerSaveKeys";
/**Helper for player dynamic properties */
export class PlayerDataPersistenceUtility {
    static clearAllProperties(player) {
        player.clearDynamicProperties();
        console.warn(`Cleared all dynamic properties for player: ${player.name}`);
    }
    static clearProperty(player, saveKey) {
        player.setDynamicProperty(saveKey, undefined);
    }
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
    static setFarmPlotLocations(player, locations) {
        player.setDynamicProperty(PlayerSaveKeys.farmPlotLocations, JSON.stringify(locations));
    }
    static getFarmPlotLocations(player) {
        const property = player.getDynamicProperty(PlayerSaveKeys.farmPlotLocations);
        if (property === undefined || typeof property !== "string") {
            return [];
        }
        try {
            return JSON.parse(property);
        }
        catch {
            return [];
        }
    }
    static setPlants(player, plants) {
        player.setDynamicProperty(PlayerSaveKeys.plants, JSON.stringify(plants));
    }
    static getPlants(player) {
        const property = player.getDynamicProperty(PlayerSaveKeys.plants);
        if (property === undefined || typeof property !== "string") {
            return [];
        }
        try {
            return JSON.parse(property);
        }
        catch {
            return [];
        }
    }
}
//# sourceMappingURL=PlayerDataPersistenceUtility.js.map