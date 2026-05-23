import { ItemComponentUseEvent, ItemUseAfterEvent } from "@minecraft/server";
import { CustomComponent } from "./CustomComponent";

export abstract class ItemCustomComponent extends CustomComponent {
  constructor() {
    super();

    this.onUse = this.onUse.bind(this);
    this.onUseVanilla = this.onUseVanilla.bind(this);
  }

  public onUse(event: ItemComponentUseEvent): void {}
  public onUseVanilla(event: ItemUseAfterEvent): void {}
}
