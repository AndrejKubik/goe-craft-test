import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
export class DashOnUseComponent extends ItemCustomComponent {
    constructor(worldSettingsManager) {
        super();
        this.worldSettingsManager = worldSettingsManager;
        this.config = {
            horizontalStrength: 2.2,
            verticalStrength: 0.5,
            isGroundDashAllowed: false,
        };
    }
    getId() {
        return "dash_on_use";
    }
    onUse(event) {
        if (this.worldSettingsManager.isSpeedCheatEnabled()) {
            tryPlayerDash(event.source, this.config);
        }
        else {
            console.warn("speed cheat disabled.");
        }
    }
    onUseVanilla(event) {
        if (this.worldSettingsManager.isSpeedCheatEnabled()) {
            tryPlayerDash(event.source, this.config);
        }
        else {
            console.warn("speed cheat disabled.");
        }
    }
}
function tryPlayerDash(player, config) {
    if (player.isOnGround && !config.isGroundDashAllowed) {
        return;
    }
    const lookDirection = player.getViewDirection();
    const dashDirection = {
        x: lookDirection.x * config.horizontalStrength,
        z: lookDirection.z * config.horizontalStrength,
    };
    player.applyKnockback(dashDirection, config.verticalStrength);
}
//# sourceMappingURL=DashOnUseComponent.js.map