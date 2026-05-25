import { ItemComponentUseEvent, ItemUseAfterEvent } from "@minecraft/server";
import { CustomComponent } from "./CustomComponent";

export abstract class ItemCustomComponent extends CustomComponent {
  constructor() {
    super();

    this.onUse = this.onUse.bind(this); //necessary because we register the onUse() as a callback to the itemComponentRegistry
  }

  public onUse(event: ItemComponentUseEvent): void {}
  public onUseVanilla(event: ItemUseAfterEvent): void {}
}
