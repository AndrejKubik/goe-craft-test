import { EntityIdUtility } from "../../utilities/EntityIdUtility";
import { BlockCustomComponent } from "../baseClasses/BlockCustomComponent";

export class PlayerGrownPlantComponent extends BlockCustomComponent {
  public static getId(): string {
    return EntityIdUtility.getFullId("player_grown_plant");
  }
}
