import { CustomComponent } from "./CustomComponent";
export class BlockCustomComponent extends CustomComponent {
    constructor() {
        super();
        this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
        this.onPlayerBreak = this.onPlayerBreak.bind(this);
    }
    onPlayerPlace(player, event) { }
    onInteract(player, event) { }
    onBreak(player, event) { }
    /**Do not override this on child classes, override onPlayerPlace() instead */
    beforeOnPlayerPlace(event) {
        const player = event.player;
        if (player) {
            this.onPlayerPlace(player, event);
        }
    }
    /**Do not override this on child classes, override onInteract() instead */
    onPlayerInteract(event) {
        const player = event.player;
        if (player) {
            this.onInteract(player, event);
        }
    }
    /**Do not override this on child classes, override onBreak() instead */
    onPlayerBreak(event) {
        const player = event.player;
        if (player) {
            this.onBreak(player, event);
        }
    }
}
//# sourceMappingURL=BlockCustomComponent.js.map