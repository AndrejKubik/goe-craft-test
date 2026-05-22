import { Player, system, world } from "@minecraft/server";
import { PlayerData } from "../data/playerData";
import { DataFactory } from "../factories/dataFactory";
import { MessageUtility } from "../utilities/messageUtility";
import { MessageTextColor } from "../data/messageTextColor";
import { PlayerSaveKeys } from "../data/playerSaveKeys";

const fullSecondTicks = 20;
const playerWelcomeMessageDelayTicks = 25;

export class PlayerManager {
  private playerMap = new Map<string, PlayerData>();

  public onTick(): void {
    for (const player of world.getPlayers()) {
      this.updatePlayerPlayTime(player);
    }
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

  private increasePlayerVisits(player: Player) {
    const currentVisits = this.getPlayerVisits(player);

    player.setDynamicProperty(PlayerSaveKeys.totalVisits, currentVisits + 1);
  }

  private increasePlayerPlayTimeSeconds(player: Player) {
    const currentTotalSeconds = this.getPlayerPlayTime(player);

    player.setDynamicProperty(PlayerSaveKeys.playTime, currentTotalSeconds + 1);
  }

  public onPlayerJoin(player: Player): void {
    this.increasePlayerVisits(player);

    system.runTimeout(() => {
      (player.sendMessage(this.getPlayerWelcomeMessage(player)), playerWelcomeMessageDelayTicks);
    }); //small delay to avoid duplicate welcome message, due to UI reload at startup
  }

  private getPlayerWelcomeMessage(player: Player): string {
    const totalSeconds = this.getPlayerPlayTime(player);
    const totalVisits = this.getPlayerVisits(player);
    const playerNameText = MessageUtility.formatString(`${player.nameTag}`, MessageTextColor.Gold);

    if (totalVisits <= 0) {
      const addonTitleText = MessageUtility.formatString("Fruit Harvest Simulator", MessageTextColor.Gold);

      return `Welcome to the ${addonTitleText}, have fun ${playerNameText}!`;
    }

    let totalVisitsText = totalVisits.toString();
    totalVisitsText = MessageUtility.formatString(totalVisitsText, MessageTextColor.Gold);

    let playTimeText = MessageUtility.formatStringTime(totalSeconds);
    playTimeText = MessageUtility.formatString(playTimeText.toString(), MessageTextColor.Gold);

    return `Welcome back ${playerNameText}!\n` + `Play time: ${playTimeText}\n` + `Total visits: ${totalVisitsText}`;
  }

  private getPlayerData(playerId: string): PlayerData {
    let playerData = this.playerMap.get(playerId);

    if (playerData === undefined) {
      playerData = DataFactory.createPlayerData();
      this.playerMap.set(playerId, playerData);
    }

    return playerData;
  }

  private getPlayerPlayTime(player: Player): number {
    let totalSeconds = 0;
    const playerPlayTimeProperty = player.getDynamicProperty(PlayerSaveKeys.playTime);

    if (playerPlayTimeProperty !== undefined) {
      totalSeconds = playerPlayTimeProperty as number;
    }

    return totalSeconds;
  }

  private getPlayerVisits(player: Player) {
    let totalVisits = 0;
    const playerTotalVisitsProperty = player.getDynamicProperty(PlayerSaveKeys.totalVisits);

    if (playerTotalVisitsProperty !== undefined) {
      totalVisits = playerTotalVisitsProperty as number;
    }

    return totalVisits;
  }
}
