import { PlayerManager } from "../systems/PlayerManager";

export class SystemFactory {
  static createPlayerManager(): PlayerManager {
    return new PlayerManager();
  }
}
