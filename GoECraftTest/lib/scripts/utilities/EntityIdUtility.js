/**Helper for identifier operations*/
export class EntityIdUtility {
    /**Returns the identifier with the addon namespace included.*/
    static getFullId(entityId) {
        return `${this.namespace}:${entityId}`;
    }
}
EntityIdUtility.namespace = "fruit_simulator";
//# sourceMappingURL=EntityIdUtility.js.map