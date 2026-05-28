import { Player, system, Vector3, world } from "@minecraft/server";
import { MessageUtility } from "../utilities/MessageUtility";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { PlayerData } from "../data/dataPersistence/PlayerData";
import { PlayerDataPersistenceManager } from "./PlayerDataPersistenceManager";

const fullSecondTicks = 20;
const playerWelcomeMessageDelayTicks = 40;
const lobbyLocation: Vector3 = { x: 0, y: -60, z: 0 };

export class PlayerManager {
  private playerMap = new Map<string, PlayerData>();

  public onTick(): void {
    for (const player of world.getPlayers()) {
      this.updatePlayerPlayTime(player);
    }
  }

  public onPlayerJoin(player: Player): void {
    // PlayerDataPersistenceManager.clearAllProperties(player); //remove this!
    this.teleportPlayerToLobby(player);
    this.increasePlayerVisits(player);
    this.loadPlayerData(player);

    system.runTimeout(
      player.sendMessage.bind(player, this.getPlayerWelcomeMessage(player)),
      playerWelcomeMessageDelayTicks //small delay to avoid duplicate welcome message, due to UI reload at startup
    );
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

  private loadPlayerData(player: Player): void {
    const playerData = this.getPlayerData(player.id);

    playerData.farmPlotLocations = PlayerDataPersistenceManager.getFarmPlotLocations(player);
    playerData.plants = PlayerDataPersistenceManager.getPlants(player);
  }

  public getPlayerData(playerId: string): PlayerData {
    let playerData = this.playerMap.get(playerId);

    if (playerData === undefined) {
      playerData = new PlayerData();

      this.playerMap.set(playerId, playerData);
    }

    return playerData;
  }

  private teleportPlayerToLobby(player: Player): void {
    player.teleport(lobbyLocation);
  }
}
