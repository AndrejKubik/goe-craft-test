export class EntityIdUtility {
  private static namespace = "fruit_simulator";

  public static getFullId(entityId: string): string {
    return `${this.namespace}:${entityId}`;
  }
}
