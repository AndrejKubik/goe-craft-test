import { CustomComponent } from "./CustomComponent";
export class BlockCustomComponent extends CustomComponent {
    constructor() {
        super();
        this.onPlace = this.onPlace.bind(this);
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlace(event) { }
    /**Do not override this on child classes, override onInteract() instead */
    onPlayerInteract(event) {
        const player = event.player;
        if (player) {
            this.onInteract(player, event);
        }
    }
    onInteract(player, event) { }
}
//# sourceMappingURL=BlockCustomComponent.js.map