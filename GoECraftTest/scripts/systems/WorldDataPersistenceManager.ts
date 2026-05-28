import { world } from "@minecraft/server";
import { WorldSaveKeys } from "../data/dataPersistence/WorldSaveKeys";
import { EnforcedGameMode } from "../data/dataPersistence/EnforcedGameMode";

export class WorldDataPersistenceManager {
  public static clearAllProperties(): void {
    world.clearDynamicProperties();

    console.warn("Cleared all world dynamic properties.");
  }

  public static clearProperty(saveKey: string): void {
    world.setDynamicProperty(saveKey, undefined);
  }

  public static setSpeedCheatEnabled(newState: boolean): void {
    world.setDynamicProperty(WorldSaveKeys.speedCheatEnabled, newState);
  }

  public static getSpeedCheatEnabled(): boolean {
    const property = world.getDynamicProperty(WorldSaveKeys.speedCheatEnabled);

    if (property === undefined || typeof property !== "boolean") {
      return false;
    }

    return property as boolean;
  }

  public static setEnforcedGameMode(gameMode: EnforcedGameMode) {
    world.setDynamicProperty(WorldSaveKeys.enforcedGameMode, gameMode);
  }

  public static getEnforcedGameMode(): EnforcedGameMode {
    const property = world.getDynamicProperty(WorldSaveKeys.enforcedGameMode);

    if (property === undefined || typeof property !== "number") {
      return EnforcedGameMode.None;
    }

    return property as EnforcedGameMode;
  }
}
