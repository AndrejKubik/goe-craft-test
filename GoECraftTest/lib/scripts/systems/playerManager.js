import { system, world } from "@minecraft/server";
import { MessageUtility } from "../utilities/MessageUtility";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { PlayerData } from "../data/dataPersistence/PlayerData";
import { PlayerDataPersistenceUtility } from "./PlayerDataPersistenceUtility";
const fullSecondTicks = 20;
const playerWelcomeMessageDelayTicks = 40;
const lobbyLocation = { x: 0, y: -60, z: 0 };
/**Handles player data and player join logic */
export class PlayerManager {
    constructor() {
        this.playerMap = new Map();
    }
    onTick() {
        for (const player of world.getPlayers()) {
            this.updatePlayerPlayTime(player);
        }
    }
    onPlayerJoin(player) {
        this.teleportPlayerToLobby(player);
        this.increasePlayerVisits(player);
        this.loadPlayerData(player);
        system.runTimeout(player.sendMessage.bind(player, this.getPlayerWelcomeMessage(player)), playerWelcomeMessageDelayTicks //small delay to avoid duplicate welcome message, due to UI reload at startup
        );
    }
    updatePlayerPlayTime(player) {
        const playerData = this.getPlayerData(player.id);
        playerData.playTimeSecondTicks++;
        if (playerData.playTimeSecondTicks < fullSecondTicks) {
            return;
        }
        this.increasePlayerPlayTimeSeconds(player);
        playerData.playTimeSecondTicks = 0;
    }
    increasePlayerPlayTimeSeconds(player) {
        const currentTotalSeconds = PlayerDataPersistenceUtility.getPlayerPlayTime(player);
        PlayerDataPersistenceUtility.setPlayTime(player, currentTotalSeconds + 1);
    }
    increasePlayerVisits(player) {
        const currentVisits = PlayerDataPersistenceUtility.getVisitCount(player);
        PlayerDataPersistenceUtility.setVisitCount(player, currentVisits + 1);
    }
    getPlayerWelcomeMessage(player) {
        const totalSeconds = PlayerDataPersistenceUtility.getPlayerPlayTime(player);
        const totalVisits = PlayerDataPersistenceUtility.getVisitCount(player);
        const playerNameText = MessageUtility.formatString(`${player.nameTag}`, MessageTextColor.Gold);
        if (totalVisits <= 1) {
            const addonTitleText = MessageUtility.formatString("Fruit Harvest Simulator", MessageTextColor.Gold);
            return `Welcome to the ${addonTitleText}, have fun ${playerNameText}!`;
        }
        let currentVisit = MessageUtility.getCounterNumberString(totalVisits);
        currentVisit = MessageUtility.formatString(currentVisit, MessageTextColor.Gold);
        let playTimeText = MessageUtility.formatStringTime(totalSeconds);
        playTimeText = MessageUtility.formatString(playTimeText.toString(), MessageTextColor.Gold);
        return `Welcome back ${playerNameText}!\n` + `Play time: ${playTimeText}\n` + `Current visit: ${currentVisit}`;
    }
    loadPlayerData(player) {
        const playerData = this.getPlayerData(player.id);
        playerData.farmPlotLocations = PlayerDataPersistenceUtility.getFarmPlotLocations(player);
        playerData.plants = PlayerDataPersistenceUtility.getPlants(player);
    }
    getPlayerData(playerId) {
        let playerData = this.playerMap.get(playerId);
        if (playerData === undefined) {
            playerData = new PlayerData();
            this.playerMap.set(playerId, playerData);
        }
        return playerData;
    }
    teleportPlayerToLobby(player) {
        player.teleport(lobbyLocation);
    }
}
//# sourceMappingURL=PlayerManager.js.map