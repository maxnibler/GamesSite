import {Directions as dir} from '../../Utils/Constants.js'

export default class AdventurerBehavior {
    constructor(scene, adventurers) {
        this.scene = scene;
        this.adventurers = adventurers;
    }

    update() {
        let coords = this.adventurers[0].getCoords();
        let idle = this.adventurers[0].isIdle();
        if (coords.y > 200 && !idle) {
            this.adventurers[0].stopMoving();
        }

    }

    addAdventurer(newAdventurer) {
        this.adventurers.push(newAdventurer);
    }
}