import { IPlantDefinition } from "./IPlantDefinition";

/**growthStageDuration - in seconds */
export const PlantDefinitions: Record<string, IPlantDefinition> = {
  tomato_plant: {
    maxGrowthStage: 2,
    growthStageDuration: 2, //set to 60
  },
  cucumber_plant: {
    maxGrowthStage: 4,
    growthStageDuration: 2, //set to 120
  },
};
