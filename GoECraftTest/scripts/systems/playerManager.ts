import { Player, system, world } from "@minecraft/server";
import { MessageUtility } from "../utilities/MessageUtility";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { PlayerData } from "../data/player/PlayerData";
import { PlayerDataPersistanceManager } from "./PlayerDataPersistanceManager";

const fullSecondTicks = 20;
const playerWelcomeMessageDelayTicks = 30;

export class PlayerManager {
  private playerMap = new Map<string, PlayerData>();

  public onTick(): void {
    for (const player of world.getPlayers()) {
      updatePlayerPlayTime(player, this.playerMap);
    }
  }

  public onPlayerJoin(player: Player): void {
    increasePlayerVisits(player);

    system.runTimeout(() => {
      player.sendMessage(getPlayerWelcomeMessage(player));
    }, playerWelcomeMessageDelayTicks); //small delay to avoid duplicate welcome message, due to UI reload at startup
  }
}

function updatePlayerPlayTime(player: Player, playerMap: Map<string, PlayerData>) {
  const playerData = getPlayerData(player.id, playerMap);

  playerData.playTimeSecondTicks++;

  if (playerData.playTimeSecondTicks < fullSecondTicks) {
    return;
  }

  increasePlayerPlayTimeSeconds(player);

  playerData.playTimeSecondTicks = 0;
}

function increasePlayerPlayTimeSeconds(player: Player) {
  const currentTotalSeconds = PlayerDataPersistanceManager.getPlayerPlayTime(player);

  PlayerDataPersistanceManager.setPlayTime(player, currentTotalSeconds + 1);
}

function increasePlayerVisits(player: Player) {
  const currentVisits = PlayerDataPersistanceManager.getVisitCount(player);

  PlayerDataPersistanceManager.setVisitCount(player, currentVisits + 1);
}

function getPlayerWelcomeMessage(player: Player): string {
  const totalSeconds = PlayerDataPersistanceManager.getPlayerPlayTime(player);
  const totalVisits = PlayerDataPersistanceManager.getVisitCount(player);
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

function getPlayerData(playerId: string, playerMap: Map<string, PlayerData>): PlayerData {
  let playerData = playerMap.get(playerId);

  if (playerData === undefined) {
    playerData = new PlayerData();
    playerMap.set(playerId, playerData);
  }

  return playerData;
}
