import { Player, world } from "@minecraft/server";
import { PlayerData } from "../data/playerData";
import { DataFactory } from "../factories/dataFactory";
import { MessageUtility } from "../utilities/messageUtility";
import { MessageTextColor } from "../data/messageTextColor";
import { MessageTextFormat } from "../data/messageTextFormat";

const playerPlayTimeSaveKey = "PLAYER_PLAY_TIME";
const fullSecondTicks = 20;

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

  private increasePlayerPlayTimeSeconds(player: Player) {
    const currentTotalSeconds = this.getPlayerPlayTime(player);

    player.setDynamicProperty(playerPlayTimeSaveKey, currentTotalSeconds + 1);
  }

  public welcomePlayer(player: Player): void {
    player.sendMessage(this.getPlayerWelcomeMessage(player));
  }

  private getPlayerWelcomeMessage(player: Player): string {
    const totalSeconds = this.getPlayerPlayTime(player);

    const playerNameText = MessageUtility.getFormattedString(`${player.nameTag}`, MessageTextColor.Gold);

    if (totalSeconds <= 0) {
      const addonTitleText = MessageUtility.getFormattedString("Fruit Harvest Simulator", MessageTextColor.Gold);

      return `Welcome to the ${addonTitleText}, have fun ${playerNameText}!`;
    }

    const playTimeText = MessageUtility.getFormattedString(totalSeconds.toString(), MessageTextColor.Gold);

    return `Welcome back ${playerNameText}, your current play time: ${playTimeText}`;
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
    const playerPlayTimeProperty = player.getDynamicProperty(playerPlayTimeSaveKey);

    if (playerPlayTimeProperty !== undefined) {
      totalSeconds = playerPlayTimeProperty as number;
    }

    return totalSeconds;
  }
}
