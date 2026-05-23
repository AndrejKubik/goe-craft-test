import { CustomComponent } from "./CustomComponent";
export class ItemCustomComponent extends CustomComponent {
    constructor() {
        super();
        this.onUse = this.onUse.bind(this);
        this.onUseVanilla = this.onUseVanilla.bind(this);
    }
    onUse(event) { }
    onUseVanilla(event) { }
}
//# sourceMappingURL=ItemCustomComponent.js.map