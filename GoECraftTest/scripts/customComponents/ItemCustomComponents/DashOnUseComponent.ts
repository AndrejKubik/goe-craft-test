import { ItemComponentUseEvent, ItemUseAfterEvent, Player } from "@minecraft/server";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";

export class DashOnUseComponent extends ItemCustomComponent {
  private readonly horizontalStrength = 2.2;
  private readonly verticalStrength = 0.5;

  getId(): string {
    return "dash_on_use";
  }

  public onUse(event: ItemComponentUseEvent): void {
    this.applyPlayerDash(event.source);
  }

  public onUseVanilla(event: ItemUseAfterEvent): void {
    this.applyPlayerDash(event.source);
  }

  public applyPlayerDash(player: Player): void {
    const lookDirection = player.getViewDirection();

    const dashDirection = {
      x: lookDirection.x * this.horizontalStrength,
      z: lookDirection.z * this.horizontalStrength,
    };

    player.applyKnockback(dashDirection, this.verticalStrength);
  }
}
