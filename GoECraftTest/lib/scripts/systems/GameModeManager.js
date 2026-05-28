import { GameMode, world } from "@minecraft/server";
import { EnforcedGameMode } from "../data/dataPersistence/EnforcedGameMode";
import { WorldDataPersistenceUtility } from "./WorldDataPersistenceUtility";
/**Handles global game mode enforcement rules */
export class GameModeManager {
    constructor() {
        this.currentEnforcedMode = EnforcedGameMode.None;
    }
    onPlayerSpawn(player) {
        if (this.currentEnforcedMode === EnforcedGameMode.Survival) {
            player.setGameMode(GameMode.Survival);
        }
        else if (this.currentEnforcedMode === EnforcedGameMode.Adventure) {
            player.setGameMode(GameMode.Creative);
        }
    }
    onStartup() {
        this.currentEnforcedMode = WorldDataPersistenceUtility.getEnforcedGameMode();
    }
    onTick() {
        this.enforceGameMode(this.currentEnforcedMode);
    }
    enforceGameMode(mode) {
        if (mode === EnforcedGameMode.None) {
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
            const playerGameMode = player.getGameMode();
            if (playerGameMode !== gameMode) {
                player.sendMessage(`Your current game mode is ${playerGameMode},\nChanging to enforced game mode : ${gameMode}`);
            }
            player.setGameMode(gameMode);
        }
    }
    setEnforcedGameMode(gameMode) {
        if (gameMode === this.currentEnforcedMode) {
            return;
        }
        this.currentEnforcedMode = gameMode;
        world.sendMessage(this.getGameModeChangeMessage());
        WorldDataPersistenceUtility.setEnforcedGameMode(this.currentEnforcedMode);
    }
    getGameModeChangeMessage() {
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
    getCurrentEnforcedMode() {
        return this.currentEnforcedMode;
    }
}
//# sourceMappingURL=GameModeManager.js.map