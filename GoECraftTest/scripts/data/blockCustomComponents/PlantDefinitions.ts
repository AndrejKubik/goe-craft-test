import { IPlantDefinition } from "./IPlantDefinition";

export const PlantDefinitions: Record<string, IPlantDefinition> = {
  tomato_plant: {
    maxGrowthStage: 2,
    growthStageDuration: 60,
  },
  cucumber_plant: {
    maxGrowthStage: 4,
    growthStageDuration: 120,
  },
};
