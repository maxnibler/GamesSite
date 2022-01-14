import {Directions as dir} from '../../Utils/Constants.js'

export default class AdventurerBehavior {
    constructor(scene, adventurers) {
        this.scene = scene;
        this.adventurers = adventurers;
        this.adventurersGoal = [];
    }

    create() {
        for (let i=0; i < this.adventurers.length; i++) {
            this.adventurersGoal.push({x: 200, y: 44});
        }

        this.scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.adventurers[0].handleCollision, this.adventurers[0]);
    }

    update() {
        let coords = this.adventurers[0].getCoords();
        let idle = this.adventurers[0].isIdle();
        this.goTowards(0);
        if (coords.y > 200 && !idle) {
            this.adventurers[0].stopMoving();
        }
    }

    goTowards(id) {
        let adventurer = this.adventurers[id];
        let dest = this.adventurersGoal[id];
        let x = dest.x - this.adventurers[id].getCoords().x;
        let y = dest.y - this.adventurers[id].getCoords().y;
        let direction = 0;

        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) direction = dir.RIGHT;
            if (x < 0) direction = dir.LEFT;
        } else if (Math.abs(y) > 0) {
            if (y > 0) direction = dir.UP;
            if (y < 0) direction = dir.DOWN;
        } else {
            console.log('stopped');
            this.adventurers[id].stopMoving();
            return;
        }
        this.adventurers[id].setDirection(direction);
        return;
    }

    addAdventurer(newAdventurer) {
        this.adventurers.push(newAdventurer);
    }
}