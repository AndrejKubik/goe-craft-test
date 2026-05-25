import { GameMode, Player, world } from "@minecraft/server";
import { EnforcedGameMode } from "../data/dataPersistence/EnforcedGameMode";

export class GameModeManager {
  private currentMode = EnforcedGameMode.Creative;

  public onPlayerSpawn(player: Player) {
    if (this.currentMode === EnforcedGameMode.Survival) {
      player.setGameMode(GameMode.Survival);
    } else if (this.currentMode === EnforcedGameMode.Creative) {
      player.setGameMode(GameMode.Creative);
    }
  }

  public onTick(): void {
    this.enforceGameMode(this.currentMode);
  }

  public enforceGameMode(mode: EnforcedGameMode): void {
    if (mode === EnforcedGameMode.Free) {
      return;
    }

    if (mode === EnforcedGameMode.Survival) {
      this.setModeForAllPlayers(GameMode.Survival);
    } else if (mode === EnforcedGameMode.Creative) {
      this.setModeForAllPlayers(GameMode.Creative);
    }
  }

  private setModeForAllPlayers(gameMode: GameMode): void {
    for (const player of world.getPlayers()) {
      if (player.getGameMode() !== gameMode) {
        player.sendMessage(`Enforced new game mode: ${gameMode.toString()}`);
      }

      player.setGameMode(gameMode);
    }
  }

  public getCurrentMode() {
    return this.currentMode;
  }
}
