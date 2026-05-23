import { world } from "@minecraft/server";
import { WorldSaveKeys } from "../data/player/WorldSaveKeys";

export class WorldDataPersistanceManager {
  static setSpeedCheatEnabled(newState: boolean): void {
    world.setDynamicProperty(WorldSaveKeys.speedCheatEnabled, newState);
  }

  static getSpeedCheatEnabled(): boolean {
    const property = world.getDynamicProperty(WorldSaveKeys.speedCheatEnabled);

    return property !== undefined && (property as boolean);
  }
}
