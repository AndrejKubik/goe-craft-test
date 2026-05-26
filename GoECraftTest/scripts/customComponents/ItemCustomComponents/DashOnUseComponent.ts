import { ItemComponentUseEvent, ItemUseAfterEvent, Player } from "@minecraft/server";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { DashOnUseComponentConfig } from "../../data/itemCustomComponents/DashOnUseComponentConfig";
import { WorldSettingsManager } from "../../systems/WorldSettingsManager";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";

export class DashOnUseComponent extends ItemCustomComponent {
  constructor(private readonly worldSettingsManager: WorldSettingsManager) {
    super();
  }

  private config: DashOnUseComponentConfig = {
    horizontalStrength: 2.2,
    verticalStrength: 0.5,
    isGroundDashAllowed: false,
  };

  public static getId(): string {
    return EntityIdUtility.getFullId("dash_on_use");
  }

  public onUse(event: ItemComponentUseEvent): void {
    if (this.worldSettingsManager.isSpeedCheatEnabled()) {
      tryPlayerDash(event.source, this.config);
    } else {
      console.warn("speed cheat disabled.");
    }
  }

  public onUseVanilla(event: ItemUseAfterEvent): void {
    if (this.worldSettingsManager.isSpeedCheatEnabled()) {
      tryPlayerDash(event.source, this.config);
    } else {
      console.warn("speed cheat disabled.");
    }
  }
}

function tryPlayerDash(player: Player, config: DashOnUseComponentConfig): void {
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
