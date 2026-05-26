export class EntityIdUtility {
    static getFullId(entityId) {
        return `${this.namespace}:${entityId}`;
    }
}
EntityIdUtility.namespace = "fruit_simulator";
//# sourceMappingURL=EntityIdUtility.js.map