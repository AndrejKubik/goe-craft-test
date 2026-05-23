import { ItemComponentRegistry, ItemUseAfterEvent, StartupEvent } from "@minecraft/server";
import { ItemCustomComponent } from "../customComponents/baseClasses/ItemCustomComponent";
import { DashOnUseComponent } from "../customComponents/ItemCustomComponents/DashOnUseComponent";
import { ShowDebugTabletOnUseComponent } from "../customComponents/ItemCustomComponents/ShowDebugTabletOnUseComponent";

export class ItemCustomComponentManager {
  private dashOnUseComponent = new DashOnUseComponent();
  private showDebugTabletOnUseComponent = new ShowDebugTabletOnUseComponent();

  private modifiedVanillaItems = new Map<string, ItemCustomComponent[]>();

  public onStartup(event: StartupEvent) {
    this.registerItemCustomComponents(event.itemComponentRegistry);
    this.registerVanillaItemCustomComponents();
  }

  public onUseItem(event: ItemUseAfterEvent): void {
    const itemId = event.itemStack.typeId;
    const itemComponents = this.modifiedVanillaItems.get(itemId);

    if (!itemComponents) {
      return;
    }

    for (const component of itemComponents) {
      component.onUseVanilla(event);
    }
  }

  private registerVanillaItemCustomComponents(): void {
    this.addCustomComponentsToItem("minecraft:iron_sword", [this.dashOnUseComponent]);
  }

  private registerItemCustomComponents(itemComponentRegistry: ItemComponentRegistry): void {
    itemComponentRegistry.registerCustomComponent(
      this.showDebugTabletOnUseComponent.getFullId(),
      this.showDebugTabletOnUseComponent
    );
  }

  private addCustomComponentsToItem<T extends ItemCustomComponent>(itemId: string, components: T[]): void {
    this.modifiedVanillaItems.set(itemId, components);
  }
}
