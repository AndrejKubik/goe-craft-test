import { ItemComponentUseEvent, ItemUseAfterEvent, Player } from "@minecraft/server";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";

export class DashOnUseComponent extends ItemCustomComponent {
  private readonly horizontalStrength = 2.2;
  private readonly verticalStrength = 0.5;
  private readonly isGroundDashAllowed = false;

  getId(): string {
    return "dash_on_use";
  }

  public onUse(event: ItemComponentUseEvent): void {
    tryPlayerDash(event.source, this.horizontalStrength, this.verticalStrength, this.isGroundDashAllowed);
  }

  public onUseVanilla(event: ItemUseAfterEvent): void {
    tryPlayerDash(event.source, this.horizontalStrength, this.verticalStrength, this.isGroundDashAllowed);
  }
}

function tryPlayerDash(
  player: Player,
  horizontalStrength: number,
  verticalStrength: number,
  isGroundDashAllowed: boolean
): void {
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
