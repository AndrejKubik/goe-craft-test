import { world } from "@minecraft/server";
export class PlayerManager {
    onTick() {
        for (const player of world.getPlayers()) {
            let currentTick = 0;
            const playerTicksProperty = player.getDynamicProperty("playerTicks");
            if (playerTicksProperty) {
                currentTick = playerTicksProperty;
            }
            currentTick++;
            player.setDynamicProperty("playerTicks", currentTick);
            player.onScreenDisplay.setActionBar(`Player Ticks: ${currentTick}`);
        }
    }
}
//# sourceMappingURL=playerManager.js.map