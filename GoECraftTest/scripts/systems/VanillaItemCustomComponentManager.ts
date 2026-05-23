import { ItemUseAfterEvent } from "@minecraft/server";
import { ItemCustomComponent } from "../customComponents/baseClasses/ItemCustomComponent";
import { DashOnUseComponent } from "../customComponents/ItemCustomComponents/DashOnUseComponent";

export class VanillaItemCustomComponentManager {
  private dashOnUseComponent = new DashOnUseComponent();
  private modifiedItems = new Map<string, ItemCustomComponent[]>();

  constructor() {
    this.addCustomComponentsToItem("minecraft:iron_sword", [this.dashOnUseComponent]);
  }

  public onUseItem(event: ItemUseAfterEvent) {
    const itemId = event.itemStack.typeId;
    const itemComponents = this.modifiedItems.get(itemId);

    if (!itemComponents) {
      return;
    }

    for (const component of itemComponents) {
      component.onUseVanilla(event);
    }
  }

  private addCustomComponentsToItem<T extends ItemCustomComponent>(itemId: string, components: T[]): void {
    this.modifiedItems.set(itemId, components);
  }
}
