import { CustomItemDisplayNames } from "../idContainers/CustomItemDisplayNames";
import { CustomItemIds } from "../idContainers/CustomItemIds";
/**Info about player-grown plants, note: growthStageDuration - in seconds */
export const PlantDefinitions = {
    tomato_plant: {
        maxGrowthStage: 2,
        growthStageDuration: 60,
        fruitItemId: CustomItemIds.tomato,
        fruitDisplayName: CustomItemDisplayNames.tomato,
        fruitDropAmount: 4,
    },
    cucumber_plant: {
        maxGrowthStage: 4,
        growthStageDuration: 120,
        fruitItemId: CustomItemIds.cucumber,
        fruitDisplayName: CustomItemDisplayNames.cucumber,
        fruitDropAmount: 8,
    },
};
//# sourceMappingURL=PlantDefinitions.js.map