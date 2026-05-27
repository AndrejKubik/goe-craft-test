import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { MathUtility } from "../../utilities/MathUtility";
import { TimeUtility } from "../../utilities/TimeUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { PlantDefinitions } from "../../data/blockCustomComponents/PlantDefinitions";
import { PlayerDataPersistenceManager } from "../../systems/PlayerDataPersistenceManager";
const bookItemId = "minecraft:book";
const fertilizerItemId = EntityIdUtility.getFullId(CustomItemIds.fertilizer);
const uberFertilizerItemId = EntityIdUtility.getFullId(CustomItemIds.uberFertilizer);
const fertilizerBoostAmount = 30;
const uberFertilizerBoostAmount = 60;
export class PlayerGrownPlantComponent extends BlockCustomComponent {
    constructor(playerManager) {
        super();
        this.playerManager = playerManager;
    }
    static getId() {
        return EntityIdUtility.getFullId("player_grown_plant");
    }
    onInteract(player, event) {
        const playerData = this.playerManager.getPlayerData(player.id);
        const playerPlants = playerData.plants;
        const plantData = this.getPlantData(playerData.plants, event.block);
        if (!plantData) {
            return; //this means player does not own the block
        }
        const plantDefinition = PlantDefinitions[plantData.plantDefinitionKey];
        const maxGrowthStage = plantDefinition.maxGrowthStage;
        let isPlayerDataChanged = false;
        if (PlayerInventoryUtility.isPlayerHoldingItem(player, bookItemId)) {
            this.showPlantGrowthInfo(player, plantData, maxGrowthStage);
        }
        else if (PlayerInventoryUtility.isPlayerHoldingItem(player, fertilizerItemId)) {
            isPlayerDataChanged = this.tryBoostPlantGrowth(player, plantData, maxGrowthStage, fertilizerBoostAmount);
        }
        else if (PlayerInventoryUtility.isPlayerHoldingItem(player, uberFertilizerItemId)) {
            isPlayerDataChanged = this.tryBoostPlantGrowth(player, plantData, maxGrowthStage, uberFertilizerBoostAmount);
        }
        if (isPlayerDataChanged) {
            PlayerDataPersistenceManager.setPlants(player, playerPlants);
        }
    }
    showPlantGrowthInfo(player, plantData, maxGrowthStage) {
        const currentGrowthStage = plantData.growthStage;
        const timeUntilNextGrowthStage = TimeUtility.ticksToSeconds(plantData.ticksUntilNextStage);
        const message = plantData.growthStage >= maxGrowthStage
            ? "Growth stage: Ripe for harvest!"
            : `Growth stage: ${currentGrowthStage} | Next stage in: ${timeUntilNextGrowthStage}`;
        player.onScreenDisplay.setActionBar(message);
    }
    /**Returns true unless fully grown plant*/
    tryBoostPlantGrowth(player, plantData, maxGrowthStage, boostAmount) {
        if (plantData.growthStage >= maxGrowthStage) {
            player.onScreenDisplay.setActionBar("There is nothing to boost, this one is ripe!");
            return false;
        }
        const newTicksLeft = plantData.ticksUntilNextStage - TimeUtility.secondsToTicks(boostAmount);
        plantData.ticksUntilNextStage = Math.max(0, newTicksLeft);
        if (newTicksLeft > 0) {
            this.showPlantGrowthInfo(player, plantData, maxGrowthStage);
        }
        else {
            player.onScreenDisplay.setActionBar("Boosted growth to next stage!");
        }
        return true;
    }
    getPlantData(playerPlants, block) {
        for (const plant of playerPlants) {
            if (MathUtility.areVectorsEqual(plant.blockLocation, block.location)) {
                return plant;
            }
        }
        return null;
    }
}
//# sourceMappingURL=PlayerGrownPlantComponent.js.map