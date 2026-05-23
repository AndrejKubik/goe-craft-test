import { ActionFormData } from "@minecraft/server-ui";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { MessageUtility } from "../../utilities/MessageUtility";
import { MessageTextColor } from "../../data/messageUtility/MessageTextColor";
const speedCheatPropertyId = "DEBUG_SPEED_CHEAT";
export class ShowDebugTabletOnUseComponent extends ItemCustomComponent {
    constructor(worldSettingsManager) {
        super();
        this.worldSettingsManager = worldSettingsManager;
    }
    getId() {
        return "show_debug_tablet_on_use";
    }
    onUse(event) {
        showDebugTablet(event.source, this.worldSettingsManager);
    }
}
async function showDebugTablet(player, worldSettingsManager) {
    const speedCheatEnabled = worldSettingsManager.isSpeedCheatEnabled();
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
        onSpeedCheatButtonClick(worldSettingsManager);
    }
}
async function showDebugTabletForm(player, speedCheatEnabled) {
    const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
    const form = new ActionFormData().title("Debug Tablet").button(speedCheatButtonText);
    return await form.show(player);
}
function onSpeedCheatButtonClick(worldSettingsManager) {
    worldSettingsManager.enableSpeedCheat(!worldSettingsManager.isSpeedCheatEnabled());
}
function getSpeedCheatButtonText(speedCheatEnabled) {
    const stateText = speedCheatEnabled
        ? MessageUtility.formatString("Enabled", MessageTextColor.DarkGreen)
        : MessageUtility.formatString("Disabled", MessageTextColor.Red);
    return `Speed Cheat : ${stateText}`;
}
//# sourceMappingURL=ShowDebugTabletOnUseComponent.js.map