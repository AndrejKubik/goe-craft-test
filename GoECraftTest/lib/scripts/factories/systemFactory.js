import { PlayerManager } from "../systems/playerManager";
export class SystemFactory {
    static createPlayerManager() {
        return new PlayerManager();
    }
}
//# sourceMappingURL=systemFactory.js.map