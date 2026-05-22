import { system, world } from "@minecraft/server";
import { DataFactory } from "../factories/DataFactory";
import { MessageUtility } from "../utilities/MessageUtility";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { PlayerSaveKeys } from "../data/player/PlayerSaveKeys";
const fullSecondTicks = 20;
const playerWelcomeMessageDelayTicks = 30;
export class PlayerManager {
    constructor() {
        this.playerMap = new Map();
    }
    onTick() {
        for (const player of world.getPlayers()) {
            this.updatePlayerPlayTime(player);
        }
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
    increasePlayerVisits(player) {
        const currentVisits = this.getPlayerVisits(player);
        player.setDynamicProperty(PlayerSaveKeys.totalVisits, currentVisits + 1);
    }
    increasePlayerPlayTimeSeconds(player) {
        const currentTotalSeconds = this.getPlayerPlayTime(player);
        player.setDynamicProperty(PlayerSaveKeys.playTime, currentTotalSeconds + 1);
    }
    onPlayerJoin(player) {
        this.increasePlayerVisits(player);
        system.runTimeout(() => {
            player.sendMessage(this.getPlayerWelcomeMessage(player));
        }, playerWelcomeMessageDelayTicks); //small delay to avoid duplicate welcome message, due to UI reload at startup
    }
    getPlayerWelcomeMessage(player) {
        const totalSeconds = this.getPlayerPlayTime(player);
        const totalVisits = this.getPlayerVisits(player);
        const playerNameText = MessageUtility.formatString(`${player.nameTag}`, MessageTextColor.Gold);
        if (totalVisits <= 0) {
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
            playerData = DataFactory.createPlayerData();
            this.playerMap.set(playerId, playerData);
        }
        return playerData;
    }
    getPlayerPlayTime(player) {
        let totalSeconds = 0;
        const playerPlayTimeProperty = player.getDynamicProperty(PlayerSaveKeys.playTime);
        if (playerPlayTimeProperty !== undefined) {
            totalSeconds = playerPlayTimeProperty;
        }
        return totalSeconds;
    }
    getPlayerVisits(player) {
        let totalVisits = 0;
        const playerTotalVisitsProperty = player.getDynamicProperty(PlayerSaveKeys.totalVisits);
        if (playerTotalVisitsProperty !== undefined) {
            totalVisits = playerTotalVisitsProperty;
        }
        return totalVisits;
    }
}
//# sourceMappingURL=PlayerManager.js.map