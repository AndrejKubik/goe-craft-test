import { Player } from "@minecraft/server";
import { PlayerSaveKeys } from "../data/dataPersistence/PlayerSaveKeys";

export class PlayerDataPersistenceManager {
  static setVisitCount(player: Player, value: number): void {
    player.setDynamicProperty(PlayerSaveKeys.totalVisits, value);
  }

  static getVisitCount(player: Player): number {
    const property = player.getDynamicProperty(PlayerSaveKeys.totalVisits);

    return property !== undefined ? (property as number) : 0;
  }

  static setPlayTime(player: Player, value: number): void {
    player.setDynamicProperty(PlayerSaveKeys.playTime, value);
  }

  static getPlayerPlayTime(player: Player): number {
    const property = player.getDynamicProperty(PlayerSaveKeys.playTime);

    return property !== undefined ? (property as number) : 0;
  }
}
