import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { MessageUtility } from "../../utilities/MessageUtility";
import { MessageTextColor } from "../../data/messageUtility/MessageTextColor";
const speedCheatPropertyId = "DEBUG_SPEED_CHEAT";
export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
    getId() {
        return "show_debug_tablet_on_use";
    }
    onUse(event) {
        showDebugTablet(event.source);
    }
}
async function showDebugTablet(player) {
    let speedCheatEnabled = getSpeedCheatEnabled();
    let debugTablet;
    try {
        debugTablet = await showDebugTabletForm(player, speedCheatEnabled);
    }
    catch (error) {
        return;
    }
    if (debugTablet.canceled) {
        return;
    }
    if (debugTablet.selection === 0) {
        speedCheatEnabled = !speedCheatEnabled;
        world.setDynamicProperty(speedCheatPropertyId, speedCheatEnabled);
    }
}
async function showDebugTabletForm(player, speedCheatEnabled) {
    const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
    const form = new ActionFormData().title("Debug Tablet").button(speedCheatButtonText);
    return await form.show(player);
}
function getSpeedCheatEnabled() {
    const property = world.getDynamicProperty(speedCheatPropertyId);
    return property !== undefined && property;
}
function getSpeedCheatButtonText(speedCheatEnabled) {
    const stateText = speedCheatEnabled
        ? MessageUtility.formatString("Enabled", MessageTextColor.DarkGreen)
        : MessageUtility.formatString("Disabled", MessageTextColor.Red);
    return `Speed Cheat : ${stateText}`;
}
//# sourceMappingURL=ShowDebugTabletOnUseComponent.js.map