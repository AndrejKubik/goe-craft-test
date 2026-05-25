import { Player } from "@minecraft/server";
import { PlayerSaveKeys } from "../data/dataPersistence/PlayerSaveKeys";

export class PlayerDataPersistenceManager {
  static setVisitCount(player: Player, value: number): void {
    player.setDynamicProperty(PlayerSaveKeys.totalVisits, value);
  }

  static getVisitCount(player: Player): number {
    const property = player.getDynamicProperty(PlayerSaveKeys.totalVisits);

    if (property === undefined || typeof property !== "number") {
      return 0;
    }

    return property as number;
  }

  static setPlayTime(player: Player, value: number): void {
    player.setDynamicProperty(PlayerSaveKeys.playTime, value);
  }

  static getPlayerPlayTime(player: Player): number {
    const property = player.getDynamicProperty(PlayerSaveKeys.playTime);

    if (property === undefined || typeof property !== "number") {
      return 0;
    }

    return property as number;
  }
}
