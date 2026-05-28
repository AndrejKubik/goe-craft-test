/**Helper for identifier operations*/
export class EntityIdUtility {
  public static readonly namespace = "fruit_simulator";

  /**Returns the identifier with the addon namespace included.*/
  public static getFullId(entityId: string): string {
    return `${this.namespace}:${entityId}`;
  }
}
