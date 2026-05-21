import { system, world, StartupEvent } from "@minecraft/server";
import { PlayerManager } from "./systems/playerManager";

const playerManager = new PlayerManager();

function onStartup(event: StartupEvent): void {
  console.warn("Startup placeholder");
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
system.run(mainTick);
