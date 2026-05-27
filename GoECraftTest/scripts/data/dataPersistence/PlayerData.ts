import { Vector3 } from "@minecraft/server";
import { IPlantData } from "../blockCustomComponents/IPlantData";

export class PlayerData {
  public playTimeSecondTicks: number = 0;
  public farmPlotLocations: Vector3[] = [];
  public plants: IPlantData[] = [];
}
