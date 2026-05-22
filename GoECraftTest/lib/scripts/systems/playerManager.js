import { world } from "@minecraft/server";
import { DataFactory } from "../factories/dataFactory";
import { MessageUtility } from "../utilities/messageUtility";
import { MessageTextColor } from "../data/messageTextColor";
const playerPlayTimeSaveKey = "PLAYER_PLAY_TIME";
const fullSecondTicks = 20;
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
    increasePlayerPlayTimeSeconds(player) {
        const currentTotalSeconds = this.getPlayerPlayTime(player);
        player.setDynamicProperty(playerPlayTimeSaveKey, currentTotalSeconds + 1);
    }
    welcomePlayer(player) {
        player.sendMessage(this.getPlayerWelcomeMessage(player));
    }
    getPlayerWelcomeMessage(player) {
        const totalSeconds = this.getPlayerPlayTime(player);
        const playerNameText = MessageUtility.getFormattedString(`${player.nameTag}`, MessageTextColor.Gold);
        if (totalSeconds <= 0) {
            const addonTitleText = MessageUtility.getFormattedString("Fruit Harvest Simulator", MessageTextColor.Gold);
            return `Welcome to the ${addonTitleText}, have fun ${playerNameText}!`;
        }
        const playTimeText = MessageUtility.getFormattedString(totalSeconds.toString(), MessageTextColor.Gold);
        return `Welcome back ${playerNameText}, your current play time: ${playTimeText}`;
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
        const playerPlayTimeProperty = player.getDynamicProperty(playerPlayTimeSaveKey);
        if (playerPlayTimeProperty !== undefined) {
            totalSeconds = playerPlayTimeProperty;
        }
        return totalSeconds;
    }
}
//# sourceMappingURL=playerManager.js.map