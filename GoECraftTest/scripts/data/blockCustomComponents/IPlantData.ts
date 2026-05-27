import { Vector3 } from "@minecraft/server";

export interface IPlantData {
  plantDefinitionKey: string;
  blockLocation: Vector3;
  growthStage: number;
  ticksUntilNextStage: number;
}
