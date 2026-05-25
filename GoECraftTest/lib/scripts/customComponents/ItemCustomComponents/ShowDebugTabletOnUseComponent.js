import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { DebugTablet } from "../../ui/DebugTablet";
export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
    constructor(worldSettingsManager) {
        super();
        this.worldSettingsManager = worldSettingsManager;
    }
    getId() {
        return "show_debug_tablet_on_use";
    }
    onUse(event) {
        const player = event.source;
        const debugTablet = new DebugTablet(this.worldSettingsManager);
        debugTablet.show(player);
    }
}
//# sourceMappingURL=ShowDebugTabletOnUseComponent.js.map