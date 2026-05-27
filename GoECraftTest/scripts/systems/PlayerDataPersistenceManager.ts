import { Player, Vector3 } from "@minecraft/server";
import { PlayerSaveKeys } from "../data/dataPersistence/PlayerSaveKeys";
import { IPlantData } from "../data/blockCustomComponents/IPlantData";

export class PlayerDataPersistenceManager {
  public static clearProperty(player: Player, saveKey: string): void {
    player.setDynamicProperty(saveKey, undefined);
  }

  public static setVisitCount(player: Player, value: number): void {
    player.setDynamicProperty(PlayerSaveKeys.totalVisits, value);
  }

  public static getVisitCount(player: Player): number {
    const property = player.getDynamicProperty(PlayerSaveKeys.totalVisits);

    if (property === undefined || typeof property !== "number") {
      return 0;
    }

    return property as number;
  }

  public static setPlayTime(player: Player, value: number): void {
    player.setDynamicProperty(PlayerSaveKeys.playTime, value);
  }

  public static getPlayerPlayTime(player: Player): number {
    const property = player.getDynamicProperty(PlayerSaveKeys.playTime);

    if (property === undefined || typeof property !== "number") {
      return 0;
    }

    return property as number;
  }

  public static setFarmPlotLocations(player: Player, locations: Vector3[]): void {
    player.setDynamicProperty(PlayerSaveKeys.farmPlotLocations, JSON.stringify(locations));
  }

  public static getFarmPlotLocations(player: Player): Vector3[] {
    const property = player.getDynamicProperty(PlayerSaveKeys.farmPlotLocations);

    if (property === undefined || typeof property !== "string") {
      return [];
    }

    try {
      return JSON.parse(property) as Vector3[];
    } catch {
      return [];
    }
  }

  public static setPlants(player: Player, plants: IPlantData[]) {
    player.setDynamicProperty(PlayerSaveKeys.plants, JSON.stringify(plants));
  }

  public static getPlants(player: Player): IPlantData[] {
    const property = player.getDynamicProperty(PlayerSaveKeys.plants);

    if (property === undefined || typeof property !== "string") {
      return [];
    }

    try {
      return JSON.parse(property) as IPlantData[];
    } catch {
      return [];
    }
  }
}
