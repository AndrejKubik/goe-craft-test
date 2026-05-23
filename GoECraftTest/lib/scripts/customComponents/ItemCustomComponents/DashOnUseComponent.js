import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
export class DashOnUseComponent extends ItemCustomComponent {
    constructor() {
        super(...arguments);
        this.horizontalStrength = 2.2;
        this.verticalStrength = 0.5;
    }
    getId() {
        return "dash_on_use";
    }
    onUse(event) {
        this.applyPlayerDash(event.source);
    }
    onUseVanilla(event) {
        this.applyPlayerDash(event.source);
    }
    applyPlayerDash(player) {
        const lookDirection = player.getViewDirection();
        const dashDirection = {
            x: lookDirection.x * this.horizontalStrength,
            z: lookDirection.z * this.horizontalStrength,
        };
        player.applyKnockback(dashDirection, this.verticalStrength);
    }
}
//# sourceMappingURL=DashOnUseComponent.js.map