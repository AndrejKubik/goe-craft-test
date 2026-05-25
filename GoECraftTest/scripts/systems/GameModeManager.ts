import { GameMode, Player, world } from "@minecraft/server";
import { EnforcedGameMode } from "../data/dataPersistence/EnforcedGameMode";

export class GameModeManager {
  private currentEnforcedMode = EnforcedGameMode.Free;

  public onPlayerSpawn(player: Player) {
    if (this.currentEnforcedMode === EnforcedGameMode.Survival) {
      player.setGameMode(GameMode.Survival);
    } else if (this.currentEnforcedMode === EnforcedGameMode.Adventure) {
      player.setGameMode(GameMode.Creative);
    }
  }

  public onTick(): void {
    this.enforceGameMode(this.currentEnforcedMode);
  }

  public setEnforcedGameMode(gameMode: EnforcedGameMode): void {
    this.currentEnforcedMode = gameMode;
  }

  public getCurrentEnforcedMode() {
    return this.currentEnforcedMode;
  }

  public enforceGameMode(mode: EnforcedGameMode): void {
    if (mode === EnforcedGameMode.Free) {
      return;
    }

    if (mode === EnforcedGameMode.Survival) {
      this.setModeForAllPlayers(GameMode.Survival);
    } else if (mode === EnforcedGameMode.Adventure) {
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
}
