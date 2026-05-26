import { CustomComponent } from "./CustomComponent";
export class BlockCustomComponent extends CustomComponent {
    constructor() {
        super();
        this.onPlace = this.onPlace.bind(this);
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlace(event) { }
    onPlayerInteract(event) { }
}
//# sourceMappingURL=BlockCustomComponent.js.map