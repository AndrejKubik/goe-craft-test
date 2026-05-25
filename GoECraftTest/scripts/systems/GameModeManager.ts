import { GameMode, Player, world } from "@minecraft/server";
import { EnforcedGameMode } from "../data/dataPersistence/EnforcedGameMode";
import { WorldDataPersistenceManager } from "./WorldDataPersistenceManager";

export class GameModeManager {
  private currentEnforcedMode = EnforcedGameMode.None;

  public onPlayerSpawn(player: Player) {
    if (this.currentEnforcedMode === EnforcedGameMode.Survival) {
      player.setGameMode(GameMode.Survival);
    } else if (this.currentEnforcedMode === EnforcedGameMode.Adventure) {
      player.setGameMode(GameMode.Creative);
    }
  }

  public onStartup() {
    this.currentEnforcedMode = WorldDataPersistenceManager.getEnforcedGameMode();
  }

  public onTick(): void {
    this.enforceGameMode(this.currentEnforcedMode);
  }

  public setEnforcedGameMode(gameMode: EnforcedGameMode): void {
    if (gameMode === this.currentEnforcedMode) {
      return;
    }

    this.currentEnforcedMode = gameMode;

    world.sendMessage(this.getGameModeChangeMessage());
    WorldDataPersistenceManager.setEnforcedGameMode(this.currentEnforcedMode);
  }

  private getGameModeChangeMessage(): string {
    const messageBase = "New game mode has been enforced:";

    switch (this.currentEnforcedMode) {
      case EnforcedGameMode.Survival:
        return `${messageBase} Survival`;
      case EnforcedGameMode.Adventure:
        return `${messageBase} Adventure`;
      default:
        return "Enforced game mode is now disabled, players are free to choose their own.";
    }
  }

  public getCurrentEnforcedMode(): EnforcedGameMode {
    return this.currentEnforcedMode;
  }

  public enforceGameMode(mode: EnforcedGameMode): void {
    if (mode === EnforcedGameMode.None) {
      return;
    }

    if (mode === EnforcedGameMode.Survival) {
      this.setModeForAllPlayers(GameMode.Survival);
    } else if (mode === EnforcedGameMode.Adventure) {
      this.setModeForAllPlayers(GameMode.Adventure);
    }
  }

  private setModeForAllPlayers(gameMode: GameMode): void {
    for (const player of world.getPlayers()) {
      const playerGameMode = player.getGameMode();

      if (playerGameMode !== gameMode) {
        player.sendMessage(
          `Your current game mode is ${playerGameMode},\nChanging to enforced game mode : ${gameMode}`
        );
      }

      player.setGameMode(gameMode);
    }
  }
}
