import { system, StartupEvent, world, PlayerSpawnAfterEvent, ItemUseAfterEvent } from "@minecraft/server";
import { PlayerManager } from "./systems/PlayerManager";
import { ItemCustomComponentManager } from "./systems/ItemCustomComponentManager";

const playerManager = new PlayerManager();
const itemCustomComponentManager = new ItemCustomComponentManager();

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
}

function onTick(): void {
  playerManager.onTick();
}

function onPlayerSpawn(event: PlayerSpawnAfterEvent): void {
  if (event.initialSpawn) {
    playerManager.onPlayerJoin(event.player);
  }
}

function onUseItem(event: ItemUseAfterEvent): void {
  itemCustomComponentManager.onUseItem(event);
}

system.beforeEvents.startup.subscribe(onStartup);
world.afterEvents.playerSpawn.subscribe(onPlayerSpawn);

world.afterEvents.itemUse.subscribe(onUseItem);

system.run(mainTick);
