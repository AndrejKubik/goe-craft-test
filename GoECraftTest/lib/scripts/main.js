import { system } from "@minecraft/server";
import { PlayerManager } from "./systems/playerManager";
const playerManager = new PlayerManager();
function onStartup(event) {
    console.warn("Startup placeholder");
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
system.run(mainTick);
//# sourceMappingURL=main.js.map