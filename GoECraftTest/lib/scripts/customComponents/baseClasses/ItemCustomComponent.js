import { CustomComponent } from "./CustomComponent";
export class ItemCustomComponent extends CustomComponent {
    constructor() {
        super();
        this.onUse = this.onUse.bind(this); //necessary because we register the onUse() as a callback to the itemComponentRegistry
    }
    onUse(event) { }
    onUseVanilla(event) { }
}
//# sourceMappingURL=ItemCustomComponent.js.map