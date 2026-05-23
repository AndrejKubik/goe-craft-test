import { ItemComponentUseEvent, ItemUseAfterEvent } from "@minecraft/server";
import { CustomComponent } from "./CustomComponent";

export abstract class ItemCustomComponent extends CustomComponent {
  public onUse(event: ItemComponentUseEvent): void {}
  public onUseVanilla(event: ItemUseAfterEvent): void {}
}
