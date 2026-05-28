import { Block, BlockComponentPlayerBreakEvent, BlockComponentPlayerInteractEvent, Player } from "@minecraft/server";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
import { PlayerManager } from "../../systems/PlayerManager";
import { PlayerInventoryUtility } from "../../utilities/PlayerInventoryUtility";
import { IPlantData } from "../../data/blockCustomComponents/IPlantData";
import { MathUtility } from "../../utilities/MathUtility";
import { TimeUtility } from "../../utilities/TimeUtility";
import { CustomItemIds } from "../../data/idContainers/CustomItemIds";
import { PlantDefinitions } from "../../data/blockCustomComponents/PlantDefinitions";
import { PlayerDataPersistenceManager } from "../../systems/PlayerDataPersistenceManager";
import { IPlantDefinition } from "../../data/blockCustomComponents/IPlantDefinition";
import { BlockUtility } from "../../utilities/BlockUtility";
import { CustomBlockIds } from "../../data/idContainers/CustomBlockIds";

const bookItemId = "minecraft:book";
const fertilizerItemId = EntityIdUtility.getFullId(CustomItemIds.fertilizer);
const uberFertilizerItemId = EntityIdUtility.getFullId(CustomItemIds.uberFertilizer);

const fertilizerBoostAmount = 30;
const uberFertilizerBoostAmount = 60;

const hoeIds = [
  "minecraft:wooden_hoe",
  "minecraft:stone_hoe",
  "minecraft:iron_hoe",
  "minecraft:golden_hoe",
  "minecraft:diamond_hoe",
  "minecraft:netherite_hoe",
];

const harvestSoundId = "random.pop";
const fertilizerSoundId = "random.fizz";
const bookSoundId = "random.toast";

export class PlayerGrownPlantComponent extends BlockCustomComponent {
  constructor(private readonly playerManager: PlayerManager) {
    super();
  }

  public static getId(): string {
    return EntityIdUtility.getFullId("player_grown_plant");
  }

  protected onInteract(player: Player, event: BlockComponentPlayerInteractEvent): void {
    const plantBlock = event.block;
    const playerPlants = this.getPlayerPlants(player);
    const plantData = this.getPlantData(playerPlants, plantBlock);

    if (!plantData) {
      return; //this means player does not own the block
    }

    const plantDefinition = PlantDefinitions[plantData.plantDefinitionKey];
    const isFullyGrown = plantData.growthStage >= plantDefinition.maxGrowthStage;

    let isPlayerDataChanged = false;

    if (PlayerInventoryUtility.isPlayerHoldingItem(player, bookItemId)) {
      this.showPlantGrowthInfo(player, plantData, isFullyGrown);
      player.dimension.playSound(bookSoundId, plantBlock.location);
    } else if (PlayerInventoryUtility.isPlayerHoldingItem(player, fertilizerItemId)) {
      isPlayerDataChanged = this.tryBoostPlantGrowth(player, plantData, isFullyGrown, fertilizerBoostAmount);
    } else if (PlayerInventoryUtility.isPlayerHoldingItem(player, uberFertilizerItemId)) {
      isPlayerDataChanged = this.tryBoostPlantGrowth(player, plantData, isFullyGrown, uberFertilizerBoostAmount);
    } else if (this.isPlayerHoldingHoeItem(player) && isFullyGrown) {
      this.harvestPlant(player, plantBlock, plantDefinition);
      this.resetFarmPlotBlock(plantBlock);

      isPlayerDataChanged = this.tryRemovePlantBlockDataFromPlayer(playerPlants, plantBlock);
      BlockUtility.removeBlock(plantBlock);
    }

    if (isPlayerDataChanged) {
      PlayerDataPersistenceManager.setPlants(player, playerPlants);
    }
  }

  protected onBreak(player: Player, event: BlockComponentPlayerBreakEvent): void {
    const plantBlock = event.block;
    const playerPlants = this.getPlayerPlants(player);
    const plantData = this.getPlantData(playerPlants, plantBlock);

    if (!plantData) {
      return; //this means player does not own the block
    }

    const plantDefinition = PlantDefinitions[plantData.plantDefinitionKey];
    const isFullyGrown = plantData.growthStage >= plantDefinition.maxGrowthStage;

    if (this.isPlayerHoldingHoeItem(player) && isFullyGrown) {
      this.harvestPlant(player, plantBlock, plantDefinition);
    }

    this.resetFarmPlotBlock(plantBlock);

    const isPlayerDataChanged = this.tryRemovePlantBlockDataFromPlayer(playerPlants, plantBlock);

    if (isPlayerDataChanged) {
      PlayerDataPersistenceManager.setPlants(player, playerPlants);
    }
  }

  private getPlayerPlants(player: Player): IPlantData[] {
    const playerData = this.playerManager.getPlayerData(player.id);

    return playerData.plants;
  }

  private showPlantGrowthInfo(player: Player, plantData: IPlantData, isFullyGrown: boolean): void {
    const currentGrowthStage = plantData.growthStage;
    const timeUntilNextGrowthStage = TimeUtility.ticksToSeconds(plantData.ticksUntilNextStage);

    const message = isFullyGrown
      ? "Growth stage: Ripe for harvest!"
      : `Growth stage: ${currentGrowthStage} | Next stage in: ${timeUntilNextGrowthStage}`;

    player.onScreenDisplay.setActionBar(message);
  }

  /**Returns true unless fully grown plant*/
  private tryBoostPlantGrowth(
    player: Player,
    plantData: IPlantData,
    isFullyGrown: boolean,
    boostAmount: number
  ): boolean {
    if (isFullyGrown) {
      player.onScreenDisplay.setActionBar("There is nothing to boost, this one is ripe!");

      return false;
    }

    const newTicksLeft = plantData.ticksUntilNextStage - TimeUtility.secondsToTicks(boostAmount);

    plantData.ticksUntilNextStage = Math.max(0, newTicksLeft);

    if (newTicksLeft > 0) {
      this.showPlantGrowthInfo(player, plantData, isFullyGrown);
    } else {
      player.onScreenDisplay.setActionBar("Boosted growth to next stage!");
    }

    player.dimension.playSound(fertilizerSoundId, plantData.blockLocation);
    return true;
  }

  private getPlantData(playerPlants: IPlantData[], block: Block): IPlantData | null {
    for (const plant of playerPlants) {
      if (MathUtility.areVectorsEqual(plant.blockLocation, block.location)) {
        return plant;
      }
    }

    return null;
  }

  private isPlayerHoldingHoeItem(player: Player): boolean {
    return PlayerInventoryUtility.isPlayerHoldingItemAny(player, hoeIds);
  }

  private harvestPlant(player: Player, plantBlock: Block, plantDefinition: IPlantDefinition): void {
    const fruitItemId = EntityIdUtility.getFullId(plantDefinition.fruitItemId);
    const dropAmount = plantDefinition.fruitDropAmount;
    const fruitDisplayName = plantDefinition.fruitDisplayName;

    PlayerInventoryUtility.addItemToPlayer(player, fruitItemId, dropAmount);
    player.onScreenDisplay.setActionBar(`Harvested ${dropAmount}x ${fruitDisplayName}`);
    plantBlock.dimension.playSound(harvestSoundId, plantBlock.location);
  }

  private resetFarmPlotBlock(plantBlock: Block) {
    const farmPlotBlock = plantBlock.below();

    if (!farmPlotBlock) {
      console.warn("Failed to find farm plot block.");

      return;
    }

    farmPlotBlock.setType(CustomBlockIds.emptyFarmPlot);
  }

  /**Returns true if a plant was removed from the data */
  private tryRemovePlantBlockDataFromPlayer(playerPlants: IPlantData[], plantBlock: Block): boolean {
    const targetIndex = playerPlants.findIndex((plant) =>
      MathUtility.areVectorsEqual(plant.blockLocation, plantBlock.location)
    );

    if (targetIndex >= 0) {
      playerPlants.splice(targetIndex, 1);

      return true;
    }

    console.warn("Trying to remove a non-existent player plant from player data, nothing to remove.");

    return false; //no matching value found
  }
}
