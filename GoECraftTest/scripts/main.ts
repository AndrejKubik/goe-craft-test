import {
  system,
  StartupEvent,
  world,
  PlayerSpawnAfterEvent,
  ItemUseAfterEvent,
  PlayerLeaveBeforeEvent,
} from "@minecraft/server";
import { PlayerManager } from "./systems/PlayerManager";
import { ItemCustomComponentManager } from "./systems/ItemCustomComponentManager";
import { CheatSettingsManager } from "./systems/CheatSettingsManager";
import { GameModeManager } from "./systems/GameModeManager";
import { BlockCustomComponentManager } from "./systems/BlockCustomComponentManager";
import { PlantGrowthManager } from "./systems/PlantGrowthManager";

const gameModeManager = new GameModeManager();
const playerManager = new PlayerManager();
const cheatSettingsManager = new CheatSettingsManager();
const itemCustomComponentManager = new ItemCustomComponentManager(cheatSettingsManager, gameModeManager);
const blockCustomComponentManager = new BlockCustomComponentManager(playerManager);
const plantGrowthManager = new PlantGrowthManager(playerManager);

function mainTick(): void {
  try {
    onTick();
  } catch (errorMessage) {
    console.error(errorMessage);
  }

  system.run(mainTick);
}

function onStartup(event: StartupEvent): void {
  itemCustomComponentManager.onStartup(event);
  blockCustomComponentManager.onStartup(event);

  system.run(onAfterStartup); //we run these in the next frame because of non-early execution methods
}

function onAfterStartup(): void {
  gameModeManager.onStartup();
  cheatSettingsManager.onStartup();
}

function onTick(): void {
  playerManager.onTick();
  gameModeManager.onTick();
  plantGrowthManager.onTick();
}

function onPlayerSpawn(event: PlayerSpawnAfterEvent): void {
  if (event.initialSpawn) {
    playerManager.onPlayerJoin(event.player);
  }
}

function onPlayerLeave(event: PlayerLeaveBeforeEvent): void {
  plantGrowthManager.onPlayerLeave(event.player);
}

function onUseItem(event: ItemUseAfterEvent): void {
  itemCustomComponentManager.onUseItem(event);
}

system.beforeEvents.startup.subscribe(onStartup);
world.afterEvents.playerSpawn.subscribe(onPlayerSpawn);
world.afterEvents.itemUse.subscribe(onUseItem);
world.beforeEvents.playerLeave.subscribe(onPlayerLeave);

system.run(mainTick);
