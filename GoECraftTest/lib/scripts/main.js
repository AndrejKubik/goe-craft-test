import { system, world } from "@minecraft/server";
import { SystemFactory } from "./factories/systemFactory";
const playerManager = SystemFactory.createPlayerManager();
function onStartup(event) {
    console.warn("Startup placeholder");
}
function onPlayerJoin(event) {
    if (event.initialSpawn) {
        playerManager.welcomePlayer(event.player);
    }
}
function onTick() {
    playerManager.onTick();
}
function mainTick() {
    try {
        onTick();
    }
    catch (errorMessage) {
        console.error(errorMessage);
    }
    system.run(mainTick);
}
system.beforeEvents.startup.subscribe(onStartup);
world.afterEvents.playerSpawn.subscribe(onPlayerJoin);
system.run(mainTick);
//# sourceMappingURL=main.js.map