import { system, world } from "@minecraft/server";
import { MessageUtility } from "../utilities/MessageUtility";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { PlayerData } from "../data/dataPersistence/PlayerData";
import { PlayerDataPersistenceManager } from "./PlayerDataPersistenceManager";
import { PlayerSaveKeys } from "../data/dataPersistence/PlayerSaveKeys";
import { BlockUtility } from "../utilities/BlockUtility";
const fullSecondTicks = 20;
const playerWelcomeMessageDelayTicks = 40;
export class PlayerManager {
    constructor() {
        this.playerMap = new Map();
    }
    onTick() {
        for (const player of world.getPlayers()) {
            this.updatePlayerPlayTime(player);
        }
    }
    onPlayerSpawn(player) {
        this.increasePlayerVisits(player);
        this.loadPlayerFarmPlotBlocks(player);
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
        const currentTotalSeconds = PlayerDataPersistenceManager.getPlayerPlayTime(player);
        PlayerDataPersistenceManager.setPlayTime(player, currentTotalSeconds + 1);
    }
    increasePlayerVisits(player) {
        const currentVisits = PlayerDataPersistenceManager.getVisitCount(player);
        PlayerDataPersistenceManager.setVisitCount(player, currentVisits + 1);
    }
    getPlayerWelcomeMessage(player) {
        const totalSeconds = PlayerDataPersistenceManager.getPlayerPlayTime(player);
        const totalVisits = PlayerDataPersistenceManager.getVisitCount(player);
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
    getPlayerData(playerId) {
        let playerData = this.playerMap.get(playerId);
        if (playerData === undefined) {
            playerData = new PlayerData();
            this.playerMap.set(playerId, playerData);
        }
        return playerData;
    }
    addFarmPlotBlockToPlayer(player, block) {
        const playerData = this.getPlayerData(player.id);
        if (playerData.farmPlotLocations.length >= 3) {
            player.sendMessage("Farm plot limit reached");
            BlockUtility.removeBlock(block);
            return;
        }
        playerData.farmPlotLocations.push(block.location);
        PlayerDataPersistenceManager.setFarmPlotLocations(player, playerData.farmPlotLocations);
    }
    loadPlayerFarmPlotBlocks(player) {
        const playerData = this.getPlayerData(player.id);
        playerData.farmPlotLocations = PlayerDataPersistenceManager.getFarmPlotLocations(player);
    }
    printPlayerBlocks(player) {
        const playerData = this.getPlayerData(player.id);
        player.sendMessage(player.getDynamicProperty(PlayerSaveKeys.farmPlotLocations));
    }
}
//# sourceMappingURL=PlayerManager.js.map