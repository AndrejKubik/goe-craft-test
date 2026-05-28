import { ItemComponentRegistry, ItemUseAfterEvent, StartupEvent } from "@minecraft/server";
import { ItemCustomComponent } from "../customComponents/baseClasses/ItemCustomComponent";
import { DashOnUseComponent } from "../customComponents/ItemCustomComponents/DashOnUseComponent";
import { ShowDebugTabletOnUseComponent } from "../customComponents/ItemCustomComponents/ShowDebugTabletOnUseComponent";
import { CheatSettingsManager } from "./CheatSettingsManager";
import { GameModeManager } from "./GameModeManager";

/**Handles registration of custom item components and adding their effects to vanilla items as well */
export class ItemCustomComponentManager {
  constructor(
    private readonly worldSettingsManager: CheatSettingsManager,
    private readonly gameModeManager: GameModeManager
  ) {}

  private modifiedVanillaItems = new Map<string, ItemCustomComponent[]>();

  public onStartup(event: StartupEvent) {
    this.registerItemCustomComponents(event.itemComponentRegistry);
    this.addCustomComponentsToVanillaItems();
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

  private addCustomComponentsToVanillaItems(): void {
    this.addCustomComponentsToItem("minecraft:iron_sword", [new DashOnUseComponent(this.worldSettingsManager)]);
  }

  private addCustomComponentsToItem(itemId: string, components: ItemCustomComponent[]): void {
    this.modifiedVanillaItems.set(itemId, components);
  }

  private registerItemCustomComponents(itemComponentRegistry: ItemComponentRegistry): void {
    itemComponentRegistry.registerCustomComponent(
      ShowDebugTabletOnUseComponent.getId(),
      new ShowDebugTabletOnUseComponent(this.worldSettingsManager, this.gameModeManager)
    );
  }
}
