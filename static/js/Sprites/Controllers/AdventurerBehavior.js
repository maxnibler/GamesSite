import {Directions as dir} from '../../Utils/Constants.js'

export default class AdventurerBehavior {
    constructor(scene, adventurers, layer) {
        this.scene = scene;
        this.adventurers = [];
        this.layer = layer;
        for (let a of adventurers) {
            this.adventurers.push({
                sprite: a,
                goal: {x: 0, y: 0},
                direction: dir.RIGHT,
                tile: {x:1, y:2},
            });
        }
    }

    create() {
        for (let i=0; i < this.adventurers.length; i++) {
            this.adventurers[i].goal = {x: 200, y: 150};
        }

        //this.scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.adventurers[0].sprite.handleCollision, this.adventurers[0].sprite);
    }

    update() {
        let coords = this.adventurers[0].sprite.getCoords();
        let idle = this.adventurers[0].sprite.isIdle();
        this.goTowards(0);
        if (this.adventurers[0].tile.x !== this.getTileIndices(coords).x || this.adventurers[0].tile.y !== this.getTileIndices(coords).y) {
            console.log(this.getAdjTiles(coords));
            this.adventurers[0].tile = this.getTileIndices(coords);
        }
        if (coords.y > 200 && !idle) {
            this.adventurers[0].sprite.stopMoving();
        }
    }

    goTowards(id) {
        let adventurer = this.adventurers[id].sprite;
        let dest = this.adventurers[id].goal;
        let x = dest.x - adventurer.getCoords().x;
        let y = dest.y - adventurer.getCoords().y;
        let direction = 0;

        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) direction = dir.RIGHT;
            if (x < 0) direction = dir.LEFT;
        } else if (Math.abs(y) > 2) { //2 is the buffer distance
            if (y > 0) direction = dir.DOWN;
            if (y < 0) direction = dir.UP;
        } else if (!adventurer.isIdle()) {
            adventurer.stopMoving();
            return;
        }
        adventurer.setDirection(direction);
        return;
    }

    getAdjTiles(coords) {
        const tileX = this.layer.worldToTileX(coords.x);
        const tileY = this.layer.worldToTileY(coords.y);
        let adjTiles = [];

        for (let i = tileX-1; i <= tileX+1; i++) {
            for (let j = tileY-1; j <= tileY+1; j++) {
                if (i !== tileX || j !== tileY) {
                    adjTiles.push({x: i, y: j});
                }
            }
        }
        return adjTiles;
    }

    getTileIndices(coords) {
        const tileX = this.layer.worldToTileX(coords.x);
        const tileY = this.layer.worldToTileY(coords.y);
        return {x: tileX, y: tileY};
    }

    addAdventurer(newAdventurer) {
        this.adventurers.push({
            sprite: newAdventurer,
            goal: {x:0, y: 0},
            direction: dir.RIGHT,
        });
    }
}