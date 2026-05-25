import { system, StartupEvent, world, PlayerSpawnAfterEvent, ItemUseAfterEvent } from "@minecraft/server";
import { PlayerManager } from "./systems/PlayerManager";
import { ItemCustomComponentManager } from "./systems/ItemCustomComponentManager";
import { WorldSettingsManager } from "./systems/WorldSettingsManager";
import { GameModeManager } from "./systems/GameModeManager";

const gameModeManager = new GameModeManager();
const playerManager = new PlayerManager();
const worldSettingsManager = new WorldSettingsManager();
const itemCustomComponentManager = new ItemCustomComponentManager(worldSettingsManager);

function mainTick(): void {
  try {
    onTick();
  } catch (errorMessage) {
    console.error(errorMessage);
  }

  system.run(mainTick);
}

function onStartup(event: StartupEvent): void {
  system.run(worldSettingsManager.onStartup.bind(worldSettingsManager));
  itemCustomComponentManager.onStartup(event);
}

function onTick(): void {
  playerManager.onTick();
  gameModeManager.onTick();
}

function onPlayerSpawn(event: PlayerSpawnAfterEvent): void {
  if (event.initialSpawn) {
    playerManager.onPlayerSpawn(event.player);
  }
}

function onUseItem(event: ItemUseAfterEvent): void {
  itemCustomComponentManager.onUseItem(event);
}

system.beforeEvents.startup.subscribe(onStartup);
world.afterEvents.playerSpawn.subscribe(onPlayerSpawn);

world.afterEvents.itemUse.subscribe(onUseItem);

system.run(mainTick);
