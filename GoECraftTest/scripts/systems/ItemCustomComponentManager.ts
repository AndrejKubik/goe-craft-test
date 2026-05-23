import { ItemComponentRegistry, ItemUseAfterEvent, StartupEvent } from "@minecraft/server";
import { ItemCustomComponent } from "../customComponents/baseClasses/ItemCustomComponent";
import { DashOnUseComponent } from "../customComponents/ItemCustomComponents/DashOnUseComponent";
import { ShowDebugTabletOnUseComponent } from "../customComponents/ItemCustomComponents/ShowDebugTabletOnUseComponent";
import { WorldSettingsManager } from "./WorldSettingsManager";

export class ItemCustomComponentManager {
  constructor(private readonly worldSettingsManager: WorldSettingsManager) {}

  private modifiedVanillaItems = new Map<string, ItemCustomComponent[]>();

  public onStartup(event: StartupEvent) {
    registerItemCustomComponents(event.itemComponentRegistry, this.worldSettingsManager);
    addCustomComponentsToVanillaItems(this.modifiedVanillaItems, this.worldSettingsManager);
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
}

function addCustomComponentsToVanillaItems(
  modifiedVanillaItems: Map<string, ItemCustomComponent[]>,
  worldSettingsManager: WorldSettingsManager
): void {
  addCustomComponentsToItem(
    "minecraft:iron_sword",
    [new DashOnUseComponent(worldSettingsManager)],
    modifiedVanillaItems
  );
}

function addCustomComponentsToItem(
  itemId: string,
  components: ItemCustomComponent[],
  modifiedVanillaItems: Map<string, ItemCustomComponent[]>
): void {
  modifiedVanillaItems.set(itemId, components);
}

function registerItemCustomComponents(
  itemComponentRegistry: ItemComponentRegistry,
  worldSettingsManager: WorldSettingsManager
): void {
  registerCustomComponent(new ShowDebugTabletOnUseComponent(worldSettingsManager), itemComponentRegistry);
}

function registerCustomComponent(customComponent: ItemCustomComponent, itemComponentRegistry: ItemComponentRegistry) {
  itemComponentRegistry.registerCustomComponent(customComponent.getFullId(), customComponent);
}
