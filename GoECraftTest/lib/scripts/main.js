import { system, world } from "@minecraft/server";
import { PlayerManager } from "./systems/PlayerManager";
import { VanillaItemCustomComponentManager } from "./systems/VanillaItemCustomComponentManager";
const playerManager = new PlayerManager();
const vanillaItemCustomComponentManager = new VanillaItemCustomComponentManager();
function onStartup(event) { }
function onPlayerSpawn(event) {
    if (event.initialSpawn) {
        playerManager.onPlayerJoin(event.player);
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
world.afterEvents.playerSpawn.subscribe(onPlayerSpawn);
world.afterEvents.itemUse.subscribe(vanillaItemCustomComponentManager.onUseItem.bind(vanillaItemCustomComponentManager));
system.run(mainTick);
//# sourceMappingURL=main.js.map