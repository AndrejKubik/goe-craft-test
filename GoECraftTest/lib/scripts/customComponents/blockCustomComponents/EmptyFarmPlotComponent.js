import { world } from "@minecraft/server";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";
export class EmptyFarmPlotComponent extends BlockCustomComponent {
    getId() {
        return "empty_farm_plot";
    }
    onPlace(event) {
        world.sendMessage("Farm plot placed.");
    }
}
//# sourceMappingURL=EmptyFarmPlotComponent.js.map