import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
const config = {
    horizontalStrength: 1.25,
    verticalStrength: 0.5,
    isGroundDashAllowed: false,
};
const dashSoundId = "item.trident.riptide_1";
export class DashOnUseComponent extends ItemCustomComponent {
    constructor(worldSettingsManager) {
        super();
        this.worldSettingsManager = worldSettingsManager;
    }
    static getId() {
        return EntityIdUtility.getFullId("dash_on_use");
    }
    onUse(event) {
        if (this.worldSettingsManager.isSpeedCheatEnabled()) {
            this.tryPlayerDash(event.source, config);
        }
    }
    onUseVanilla(event) {
        if (this.worldSettingsManager.isSpeedCheatEnabled()) {
            this.tryPlayerDash(event.source, config);
        }
    }
    tryPlayerDash(player, config) {
        if (player.isOnGround && !config.isGroundDashAllowed) {
            return;
        }
        const lookDirection = player.getViewDirection();
        const dashDirection = {
            x: lookDirection.x * config.horizontalStrength,
            z: lookDirection.z * config.horizontalStrength,
        };
        player.applyKnockback(dashDirection, config.verticalStrength);
        player.dimension.playSound(dashSoundId, player.location);
    }
}
//# sourceMappingURL=DashOnUseComponent.js.map