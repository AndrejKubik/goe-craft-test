import { ActionFormData } from "@minecraft/server-ui";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { MessageUtility } from "../utilities/MessageUtility";
export class DebugTablet {
    constructor(worldSettingsManager) {
        this.worldSettingsManager = worldSettingsManager;
    }
    async show(player) {
        const speedCheatEnabled = this.worldSettingsManager.isSpeedCheatEnabled();
        let debugTablet;
        try {
            debugTablet = await showActionForm(player, speedCheatEnabled);
        }
        catch (error) {
            return;
        }
        if (debugTablet.canceled) {
            return;
        }
        if (debugTablet.selection === 0) {
            this.onSpeedCheatButtonClick();
        }
    }
    onSpeedCheatButtonClick() {
        this.worldSettingsManager.toggleSpeedCheatState();
    }
}
async function showActionForm(player, speedCheatEnabled) {
    const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
    const form = new ActionFormData().title("Debug Tablet").button(speedCheatButtonText);
    return await form.show(player);
}
function getSpeedCheatButtonText(speedCheatEnabled) {
    const stateText = speedCheatEnabled
        ? MessageUtility.formatString("Enabled", MessageTextColor.DarkGreen)
        : MessageUtility.formatString("Disabled", MessageTextColor.Red);
    return `Speed Cheat : ${stateText}`;
}
//# sourceMappingURL=DebugTablet.js.map