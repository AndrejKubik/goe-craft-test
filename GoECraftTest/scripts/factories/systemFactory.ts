import { PlayerManager } from "../systems/playerManager";

export class SystemFactory {
  static createPlayerManager(): PlayerManager {
    return new PlayerManager();
  }
}
