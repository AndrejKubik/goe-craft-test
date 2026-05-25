import { ModalFormData } from "@minecraft/server-ui";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { MessageUtility } from "../utilities/MessageUtility";
export class DebugTablet {
    constructor(worldSettingsManager
    // private readonly gameModeManager: GameModeManager
    ) {
        this.worldSettingsManager = worldSettingsManager;
    }
    async show(player) {
        const speedCheatEnabled = this.worldSettingsManager.isSpeedCheatEnabled();
        let debugTablet;
        try {
            debugTablet = await showModelForm(player, speedCheatEnabled);
        }
        catch (error) {
            return;
        }
        if (debugTablet.canceled) {
            return;
        }
        this.onSubmit(debugTablet.formValues);
    }
    onSubmit(modalFormValues) {
        if (modalFormValues === undefined) {
            console.error("Invalid modal form data provided for debug tablet.");
            return;
        }
        this.worldSettingsManager.enableSpeedCheat(modalFormValues[0]);
    }
}
async function showModelForm(player, speedCheatEnabled) {
    const speedCheatButtonText = getSpeedCheatButtonText(speedCheatEnabled);
    const form = new ModalFormData()
        .title("Debug Tablet")
        .toggle(speedCheatButtonText, { defaultValue: speedCheatEnabled })
        .dropdown("Game Mode", ["Enforced Survival", "Enforced Adventure", "Free"], { defaultValueIndex: 0 });
    return await form.show(player);
}
function getSpeedCheatButtonText(speedCheatEnabled) {
    const stateText = "Speed cheat enabled";
    return speedCheatEnabled
        ? MessageUtility.formatString(stateText, MessageTextColor.DarkGreen)
        : MessageUtility.formatString(stateText, MessageTextColor.Red);
}
//# sourceMappingURL=DebugTablet.js.map