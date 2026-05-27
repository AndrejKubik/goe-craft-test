import { Block } from "@minecraft/server";
import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";

export class PlantGrowthComponent extends BlockCustomComponent {
  public static getId(): string {
    return EntityIdUtility.getFullId("plant_growth");
  }
}
