import { ItemComponentUseEvent, ItemUseAfterEvent, Player } from "@minecraft/server";
import { ItemCustomComponent } from "../baseClasses/ItemCustomComponent";
import { IDashOnUseComponentConfig } from "../../data/itemCustomComponents/IDashOnUseComponentConfig";
import { CheatSettingsManager } from "../../systems/CheatSettingsManager";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";

const config: IDashOnUseComponentConfig = {
  horizontalStrength: 1.25,
  verticalStrength: 0.5,
  isGroundDashAllowed: false,
};

const dashSoundId = "item.trident.riptide_1";

/**Reusable component for speed cheat effect on use */
export class DashOnUseComponent extends ItemCustomComponent {
  constructor(private readonly worldSettingsManager: CheatSettingsManager) {
    super();
  }

  public static getId(): string {
    return EntityIdUtility.getFullId("dash_on_use");
  }

  public onUse(event: ItemComponentUseEvent): void {
    if (this.worldSettingsManager.isSpeedCheatEnabled()) {
      this.tryPlayerDash(event.source, config);
    }
  }

  public onUseVanilla(event: ItemUseAfterEvent): void {
    if (this.worldSettingsManager.isSpeedCheatEnabled()) {
      this.tryPlayerDash(event.source, config);
    }
  }

  private tryPlayerDash(player: Player, config: IDashOnUseComponentConfig): void {
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
