import { system, StartupEvent, world, PlayerSpawnAfterEvent } from "@minecraft/server";
import { SystemFactory } from "./factories/systemFactory";

const playerManager = SystemFactory.createPlayerManager();

function onStartup(event: StartupEvent): void {
  console.warn("Startup placeholder");
}

function onPlayerJoin(event: PlayerSpawnAfterEvent): void {
  if (event.initialSpawn) {
    playerManager.welcomePlayer(event.player);
  }
}

function onTick(): void {
  playerManager.onTick();
}

function mainTick(): void {
  try {
    onTick();
  } catch (errorMessage) {
    console.error(errorMessage);
  }

  system.run(mainTick);
}

system.beforeEvents.startup.subscribe(onStartup);
world.afterEvents.playerSpawn.subscribe(onPlayerJoin);
system.run(mainTick);
