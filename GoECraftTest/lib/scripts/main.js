import { system, world } from "@minecraft/server";
import { PlayerManager } from "./systems/PlayerManager";
import { ItemCustomComponentManager } from "./systems/ItemCustomComponentManager";
const playerManager = new PlayerManager();
const itemCustomComponentManager = new ItemCustomComponentManager();
function mainTick() {
    try {
        onTick();
    }
    catch (errorMessage) {
        console.error(errorMessage);
    }
    system.run(mainTick);
}
function onStartup(event) {
    itemCustomComponentManager.onStartup(event);
}
function onTick() {
    playerManager.onTick();
}
function onPlayerSpawn(event) {
    if (event.initialSpawn) {
        playerManager.onPlayerJoin(event.player);
    }
}
function onUseItem(event) {
    itemCustomComponentManager.onUseItem(event);
}
system.beforeEvents.startup.subscribe(onStartup);
world.afterEvents.playerSpawn.subscribe(onPlayerSpawn);
world.afterEvents.itemUse.subscribe(onUseItem);
system.run(mainTick);
//# sourceMappingURL=main.js.map