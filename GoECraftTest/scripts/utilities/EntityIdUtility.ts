export class EntityIdUtility {
  private static namespace = "fruit_simulator";

  /**Returns the identifier with the addon namespace included.*/
  public static getFullId(entityId: string): string {
    return `${this.namespace}:${entityId}`;
  }
}
