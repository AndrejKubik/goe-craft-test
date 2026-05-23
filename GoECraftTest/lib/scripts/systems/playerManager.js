import { system, world } from "@minecraft/server";
import { MessageUtility } from "../utilities/MessageUtility";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { PlayerData } from "../data/dataPersistence/PlayerData";
import { PlayerDataPersistenceManager } from "./PlayerDataPersistenceManager";
const fullSecondTicks = 20;
const playerWelcomeMessageDelayTicks = 35;
export class PlayerManager {
    constructor() {
        this.playerMap = new Map();
    }
    onTick() {
        for (const player of world.getPlayers()) {
            updatePlayerPlayTime(player, this.playerMap);
        }
    }
    onPlayerJoin(player) {
        increasePlayerVisits(player);
        system.runTimeout(() => {
            player.sendMessage(getPlayerWelcomeMessage(player));
        }, playerWelcomeMessageDelayTicks); //small delay to avoid duplicate welcome message, due to UI reload at startup
    }
}
function updatePlayerPlayTime(player, playerMap) {
    const playerData = getPlayerData(player.id, playerMap);
    playerData.playTimeSecondTicks++;
    if (playerData.playTimeSecondTicks < fullSecondTicks) {
        return;
    }
    increasePlayerPlayTimeSeconds(player);
    playerData.playTimeSecondTicks = 0;
}
function increasePlayerPlayTimeSeconds(player) {
    const currentTotalSeconds = PlayerDataPersistenceManager.getPlayerPlayTime(player);
    PlayerDataPersistenceManager.setPlayTime(player, currentTotalSeconds + 1);
}
function increasePlayerVisits(player) {
    const currentVisits = PlayerDataPersistenceManager.getVisitCount(player);
    PlayerDataPersistenceManager.setVisitCount(player, currentVisits + 1);
}
function getPlayerWelcomeMessage(player) {
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
function getPlayerData(playerId, playerMap) {
    let playerData = playerMap.get(playerId);
    if (playerData === undefined) {
        playerData = new PlayerData();
        playerMap.set(playerId, playerData);
    }
    return playerData;
}
//# sourceMappingURL=PlayerManager.js.map