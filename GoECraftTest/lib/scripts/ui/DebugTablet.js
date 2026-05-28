import { ModalFormData } from "@minecraft/server-ui";
import { MessageTextColor } from "../data/messageUtility/MessageTextColor";
import { MessageUtility } from "../utilities/MessageUtility";
import { PlayerDataPersistenceUtility } from "../systems/PlayerDataPersistenceUtility";
import { WorldDataPersistenceUtility } from "../systems/WorldDataPersistenceUtility";
/**Debug tablet drawing and callbacks*/
export class DebugTablet {
    constructor(player, cheatSettingsManager, gameModeManager) {
        this.player = player;
        this.cheatSettingsManager = cheatSettingsManager;
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
        this.cheatSettingsManager.enableSpeedCheat(modalFormValues[0]);
        this.gameModeManager.setEnforcedGameMode(modalFormValues[1]);
        if (modalFormValues[4] === true) {
            PlayerDataPersistenceUtility.clearAllProperties(this.player);
        }
        if (modalFormValues[5] === true) {
            WorldDataPersistenceUtility.clearAllProperties();
        }
    }
    async showModalForm() {
        const form = new ModalFormData()
            .title("Debug Tablet")
            .toggle(this.getSpeedCheatToggleLabel(), {
            defaultValue: this.cheatSettingsManager.isSpeedCheatEnabled(),
        })
            .dropdown("Game Mode", ["Enforced Survival", "Enforced Adventure", "Free"], {
            defaultValueIndex: this.gameModeManager.getCurrentEnforcedMode(),
        })
            .divider()
            .label("use [/reload all] right after using these two for expected behavior!")
            .toggle("Clear player dynamic properties")
            .toggle("Clear world dynamic properties");
        return await form.show(this.player);
    }
    getSpeedCheatToggleLabel() {
        const stateText = "Speed cheat enabled";
        return this.cheatSettingsManager.isSpeedCheatEnabled()
            ? MessageUtility.formatString(stateText, MessageTextColor.DarkGreen)
            : MessageUtility.formatString(stateText, MessageTextColor.Red);
    }
}
//# sourceMappingURL=DebugTablet.js.map