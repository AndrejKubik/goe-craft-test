import { world } from "@minecraft/server";

export class PlayerManager {
  public onTick(): void {
    for (const player of world.getPlayers()) {
      let currentTick: number = 0;
      const playerTicksProperty = player.getDynamicProperty("playerTicks");

      if (playerTicksProperty) {
        currentTick = playerTicksProperty as number;
      }

      currentTick++;

      player.setDynamicProperty("playerTicks", currentTick);
      player.onScreenDisplay.setActionBar(`Player Ticks: ${currentTick}`);
    }
  }
}
