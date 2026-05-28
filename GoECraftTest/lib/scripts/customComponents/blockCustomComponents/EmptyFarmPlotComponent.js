import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { CustomBlockIds } from "../../data/idContainers/CustomBlockIds";
import { PlantDefinitions } from "../../data/blockCustomComponents/PlantDefinitions";
import { PlantDefinitionKeys } from "../../data/blockCustomComponents/PlantDefinitionKeys";
import { TimeUtility } from "../../utilities/TimeUtility";
import { BlockUtility } from "../../utilities/BlockUtility";
import { BlockPermutationStateKeys } from "../../data/blockCustomComponents/BlockPermutationStateKeys";
import { PlayerDataPersistenceManager } from "../../systems/PlayerDataPersistenceManager";
import { MathUtility } from "../../utilities/MathUtility";
const usedFarmPlotId = EntityIdUtility.getFullId(CustomBlockIds.usedFarmPlot);
const tomatoSeedId = EntityIdUtility.getFullId(CustomItemIds.tomatoSeed);
const cucumberSeedId = EntityIdUtility.getFullId(CustomItemIds.cucumberSeed);
const tomatoPlantId = EntityIdUtility.getFullId(CustomBlockIds.tomatoPlant);
const cucumberPlantId = EntityIdUtility.getFullId(CustomBlockIds.cucumberPlant);
const invalidIndex = -1;
const plantSeedSoundId = "random.pop";
export class EmptyFarmPlotComponent extends BlockCustomComponent {
    constructor(playerManager) {
        super();
        this.playerManager = playerManager;
    }
    static getId() {
        return EntityIdUtility.getFullId("empty_farm_plot");
    }
    onPlayerPlace(player, event) {
        event.cancel = !this.tryAddBlockToPlayerFarmPlots(player, event.block);
    }
    onInteract(player, event) {
        const block = event.block;
        if (!this.isBlockOwnedByPlayer(event.block, player)) {
            return;
        }
        if (PlayerInventoryUtility.isPlayerHoldingItem(player, tomatoSeedId)) {
            this.plantSeed(player, block, PlantDefinitionKeys.tomato, tomatoPlantId);
        }
        else if (PlayerInventoryUtility.isPlayerHoldingItem(player, cucumberSeedId)) {
            this.plantSeed(player, block, PlantDefinitionKeys.cucumber, cucumberPlantId);
        }
    }
    onBreak(player, event) {
        const block = event.block;
        const playerFarmPlots = this.getPlayerFarmPlots(player);
        const playerOwnedBlockIndex = this.getPlayerOwnedBlockIndex(block, playerFarmPlots);
        if (playerOwnedBlockIndex == invalidIndex) {
            return;
        }
        playerFarmPlots.splice(playerOwnedBlockIndex, 1);
        PlayerDataPersistenceManager.setFarmPlotLocations(player, playerFarmPlots);
    }
    /**Returns true if the operation fails */
    tryAddBlockToPlayerFarmPlots(player, block) {
        const playerFarmPlots = this.getPlayerFarmPlots(player);
        if (playerFarmPlots.length >= 3) {
            player.sendMessage("Farm plot limit reached, cannot place block.");
            return false;
        }
        playerFarmPlots.push(block.location);
        PlayerDataPersistenceManager.setFarmPlotLocations(player, playerFarmPlots);
        return true;
    }
    isBlockOwnedByPlayer(block, player) {
        const playerFarmPlots = this.getPlayerFarmPlots(player);
        return this.getPlayerOwnedBlockIndex(block, playerFarmPlots) != invalidIndex;
    }
    getPlayerFarmPlots(player) {
        const playerData = this.playerManager.getPlayerData(player.id);
        return playerData.farmPlotLocations;
    }
    getPlayerOwnedBlockIndex(block, playerFarmPlots) {
        return playerFarmPlots.findIndex((playerOwnedBlock) => MathUtility.areVectorsEqual(block.location, playerOwnedBlock)); // returns -1 if it finds no matches
    }
    plantSeed(player, farmPlotBlock, plantDefinitionKey, plantBlockId) {
        const plantBlock = farmPlotBlock.above();
        if (!plantBlock) {
            console.error("Cannot find the block data for block above the farm plot. Cannot plant seeds");
            return;
        }
        farmPlotBlock.setType(usedFarmPlotId);
        plantBlock.setType(plantBlockId);
        BlockUtility.setPermutationByIndex(plantBlock, EntityIdUtility.getFullId(BlockPermutationStateKeys.plantGrowth), 0);
        const plantDefinition = PlantDefinitions[plantDefinitionKey];
        if (!plantDefinition) {
            console.error(`Cannot plant seed, requested invalid plant definition: ${plantDefinitionKey}`);
            return;
        }
        const newPlantData = {
            plantDefinitionKey: plantDefinitionKey,
            blockLocation: plantBlock.location,
            growthStage: 0,
            growthStageVisual: 0,
            ticksUntilNextStage: TimeUtility.secondsToTicks(plantDefinition.growthStageDuration),
        };
        const playerData = this.playerManager.getPlayerData(player.id);
        const playerPlants = playerData.plants;
        playerPlants.push(newPlantData);
        PlayerDataPersistenceManager.setPlants(player, playerPlants);
        farmPlotBlock.dimension.playSound(plantSeedSoundId, farmPlotBlock.location);
    }
}
//# sourceMappingURL=EmptyFarmPlotComponent.js.map