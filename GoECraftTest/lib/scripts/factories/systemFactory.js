import { PlayerManager } from "../systems/PlayerManager";
export class SystemFactory {
    static createPlayerManager() {
        return new PlayerManager();
    }
}
//# sourceMappingURL=SystemFactory.js.map