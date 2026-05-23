import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
    getId() {
        return "show_debug_tablet_on_use";
    }
    onUse(event) {
        showDebugTablet(event.source);
    }
}
function showDebugTablet(player) {
    player.sendMessage("Debug tablet");
}
//# sourceMappingURL=ShowDebugTabletOnUseComponent.js.map