import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
export class DashOnUseComponent extends ItemCustomComponent {
    constructor() {
        super(...arguments);
        this.horizontalStrength = 2.2;
        this.verticalStrength = 0.5;
        this.isGroundDashAllowed = false;
    }
    getId() {
        return "dash_on_use";
    }
    onUse(event) {
        tryPlayerDash(event.source, this.horizontalStrength, this.verticalStrength, this.isGroundDashAllowed);
    }
    onUseVanilla(event) {
        tryPlayerDash(event.source, this.horizontalStrength, this.verticalStrength, this.isGroundDashAllowed);
    }
}
function tryPlayerDash(player, horizontalStrength, verticalStrength, isGroundDashAllowed) {
    if (player.isOnGround && !isGroundDashAllowed) {
        return;
    }
    const lookDirection = player.getViewDirection();
    const dashDirection = {
        x: lookDirection.x * horizontalStrength,
        z: lookDirection.z * horizontalStrength,
    };
    player.applyKnockback(dashDirection, verticalStrength);
}
//# sourceMappingURL=DashOnUseComponent.js.map