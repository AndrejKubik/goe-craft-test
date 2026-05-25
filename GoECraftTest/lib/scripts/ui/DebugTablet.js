import { ModalFormData } from "@minecraft/server-ui";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { MessageUtility } from "../utilities/MessageUtility";
export class DebugTablet {
    constructor(player, worldSettingsManager, gameModeManager) {
        this.player = player;
        this.worldSettingsManager = worldSettingsManager;
        this.gameModeManager = gameModeManager;
    }
    async show() {
        let debugTablet;
        try {
            debugTablet = await this.showModalForm();
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
        this.gameModeManager.setEnforcedGameMode(modalFormValues[1]);
    }
    async showModalForm() {
        const form = new ModalFormData()
            .title("Debug Tablet")
            .toggle(this.getSpeedCheatToggleLabel(), {
            defaultValue: this.worldSettingsManager.isSpeedCheatEnabled(),
        })
            .dropdown("Game Mode", ["Enforced Survival", "Enforced Adventure", "Free"], {
            defaultValueIndex: this.gameModeManager.getCurrentEnforcedMode(),
        });
        return await form.show(this.player);
    }
    getSpeedCheatToggleLabel() {
        const stateText = "Speed cheat enabled";
        return this.worldSettingsManager.isSpeedCheatEnabled()
            ? MessageUtility.formatString(stateText, MessageTextColor.DarkGreen)
            : MessageUtility.formatString(stateText, MessageTextColor.Red);
    }
}
//# sourceMappingURL=DebugTablet.js.map