import { Player, system, world } from "@minecraft/server";
import { MessageUtility } from "../utilities/MessageUtility";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { PlayerData } from "../data/dataPersistence/PlayerData";
import { PlayerDataPersistenceManager } from "./PlayerDataPersistenceManager";

const fullSecondTicks = 20;
const playerWelcomeMessageDelayTicks = 35;

export class PlayerManager {
  private playerMap = new Map<string, PlayerData>();

  public onTick(): void {
    for (const player of world.getPlayers()) {
      this.updatePlayerPlayTime(player);
    }
  }

  public onPlayerSpawn(player: Player): void {
    this.increasePlayerVisits(player);

    system.runTimeout(() => {
      player.sendMessage(this.getPlayerWelcomeMessage(player));
    }, playerWelcomeMessageDelayTicks); //small delay to avoid duplicate welcome message, due to UI reload at startup
  }

  private updatePlayerPlayTime(player: Player) {
    const playerData = this.getPlayerData(player.id);

    playerData.playTimeSecondTicks++;

    if (playerData.playTimeSecondTicks < fullSecondTicks) {
      return;
    }

    this.increasePlayerPlayTimeSeconds(player);

    playerData.playTimeSecondTicks = 0;
  }

  private increasePlayerPlayTimeSeconds(player: Player) {
    const currentTotalSeconds = PlayerDataPersistenceManager.getPlayerPlayTime(player);

    PlayerDataPersistenceManager.setPlayTime(player, currentTotalSeconds + 1);
  }

  private increasePlayerVisits(player: Player) {
    const currentVisits = PlayerDataPersistenceManager.getVisitCount(player);

    PlayerDataPersistenceManager.setVisitCount(player, currentVisits + 1);
  }

  private getPlayerWelcomeMessage(player: Player): string {
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

  private getPlayerData(playerId: string): PlayerData {
    let playerData = this.playerMap.get(playerId);

    if (playerData === undefined) {
      playerData = new PlayerData();

      this.playerMap.set(playerId, playerData);
    }

    return playerData;
  }
}
