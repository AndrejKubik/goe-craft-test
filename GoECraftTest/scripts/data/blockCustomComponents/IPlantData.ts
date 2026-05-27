import { Vector3 } from "@minecraft/server";

export interface IPlantData {
  plantId: string;
  blockLocation: Vector3;
  growthStage: number;
  stageGrowTime: number;
}
