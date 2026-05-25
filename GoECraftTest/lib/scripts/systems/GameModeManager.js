import { GameMode, world } from "@minecraft/server";
import { EnforcedGameMode } from "../data/dataPersistence/EnforcedGameMode";
export class GameModeManager {
    constructor() {
        this.currentEnforcedMode = EnforcedGameMode.Free;
    }
    onPlayerSpawn(player) {
        if (this.currentEnforcedMode === EnforcedGameMode.Survival) {
            player.setGameMode(GameMode.Survival);
        }
        else if (this.currentEnforcedMode === EnforcedGameMode.Adventure) {
            player.setGameMode(GameMode.Creative);
        }
    }
    onTick() {
        this.enforceGameMode(this.currentEnforcedMode);
    }
    setEnforcedGameMode(gameMode) {
        this.currentEnforcedMode = gameMode;
    }
    getCurrentEnforcedMode() {
        return this.currentEnforcedMode;
    }
    enforceGameMode(mode) {
        if (mode === EnforcedGameMode.Free) {
            return;
        }
        if (mode === EnforcedGameMode.Survival) {
            this.setModeForAllPlayers(GameMode.Survival);
        }
        else if (mode === EnforcedGameMode.Adventure) {
            this.setModeForAllPlayers(GameMode.Adventure);
        }
    }
    setModeForAllPlayers(gameMode) {
        for (const player of world.getPlayers()) {
            if (player.getGameMode() !== gameMode) {
                player.sendMessage(`Enforced new game mode: ${gameMode.toString()}`);
            }
            player.setGameMode(gameMode);
        }
    }
}
//# sourceMappingURL=GameModeManager.js.map