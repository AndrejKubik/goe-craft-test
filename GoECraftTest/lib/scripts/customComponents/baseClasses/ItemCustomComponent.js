import { CustomComponent } from "./CustomComponent";
export class ItemCustomComponent extends CustomComponent {
    constructor() {
        super();
        this.onUse = this.onUse.bind(this); //necessary because we register the onUse() as a callback to the itemComponentRegistry
    }
    /**Override this method to use the effect on a custom item */
    onUse(event) { }
    /**Override this method to use the effect on a vanilla item */
    onUseVanilla(event) { }
}
//# sourceMappingURL=ItemCustomComponent.js.map