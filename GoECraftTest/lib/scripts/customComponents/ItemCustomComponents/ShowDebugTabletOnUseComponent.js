import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { DebugTablet } from "../../ui/DebugTablet";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
    constructor(worldSettingsManager, gameModeManager) {
        super();
        this.worldSettingsManager = worldSettingsManager;
        this.gameModeManager = gameModeManager;
    }
    static getId() {
        return EntityIdUtility.getFullId("show_debug_tablet_on_use");
    }
    onUse(event) {
        const player = event.source;
        const debugTablet = new DebugTablet(player, this.worldSettingsManager, this.gameModeManager);
        debugTablet.show();
    }
}
//# sourceMappingURL=ShowDebugTabletOnUseComponent.js.map