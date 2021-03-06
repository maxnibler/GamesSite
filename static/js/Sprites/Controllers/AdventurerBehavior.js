import {Directions as dir, BUFFER_DISTANCE} from '../../Utils/Constants.js'


const tileCompare = (tileA, tileB) => {
    // takes in 2 objects with tile indices. Returns true if same, false if different
    if (tileA.x !== tileB.x) return false;
    if (tileA.y !== tileB.y) return false;
    return true;
}

const tileIn = (tileList, tile) => {
    for (let t of tileList) {
        if (tileCompare(t, tile)) {
            return true;
        }
    }
    return false;
}

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
                visited: [],
                path: [],
            });
        }
    }

    create() {
        for (let i=0; i < this.adventurers.length; i++) {
            this.adventurers[i].goal = {x: 2, y: 1};
        }

        //this.scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.adventurers[0].sprite.handleCollision, this.adventurers[0].sprite);
    }

    update() {
        let coords = this.adventurers[0].sprite.getCoords();
        this.setGoal(this.adventurers[0]);
        this.goTowardsGoal(this.adventurers[0]);
        //console.log(this.adventurers[0].goal);
    }

    setGoal(adventurer) {
        let currentTile = this.getTileIndices(adventurer.sprite.getCoords());
        if (!tileCompare(currentTile, adventurer.goal)) {
            return;
        }
        adventurer.visited.push(currentTile);
        let tileList = this.getAdjTiles(currentTile);
        //console.log('adj', tileList);
        adventurer.goal = this.selectTile(tileList);
        adventurer.tile = currentTile;
    }

    selectTile(tileList) {
        let tileGoal = tileList[Phaser.Math.Between(0, tileList.length-1)];
        return tileGoal;
    }

    goTowardsGoal(adventurer) {
        let adventurerSprite = adventurer.sprite;
        let destX = this.layer.tileToWorldXY(adventurer.goal.x, adventurer.goal.y).x;
        let destY = this.layer.tileToWorldXY(adventurer.goal.x, adventurer.goal.y).y;
        let x = destX - adventurerSprite.getCoords().x + 16;
        let y = destY - adventurerSprite.getCoords().y + 16;
        let direction = 0;

        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) direction = dir.RIGHT;
            if (x < 0) direction = dir.LEFT;
        } else if (Math.abs(y) > BUFFER_DISTANCE) {
            if (y > 0) direction = dir.DOWN;
            if (y < 0) direction = dir.UP;
        }/* else if (!adventurerSprite.isIdle()) {
            adventurerSprite.stopMoving();
            return;
        }*/
        adventurerSprite.setDirection(direction);
        return;
    }

    getAdjTiles(tile) {
        let adjTiles = [];
        let xDiff = 0, yDiff = 0;
        let rmTiles = [];
        let i;

        for (let i = tile.x-1; i <= tile.x+1; i++) {
            for (let j = tile.y-1; j <= tile.y+1; j++) {
                if (i !== tile.x || j !== tile.y) { //If not Current tile
                    if(!this.layer.getTileAt(i, j).properties.collides){ //If 'collides' != true
                        adjTiles.push({x: i, y: j});
                    }
                }
            }
        }

        for (i in adjTiles) { //Check whether diag tiles are accessible directly
            xDiff = adjTiles[i].x - tile.x;
            yDiff = adjTiles[i].y - tile.y;
            if (Math.abs(xDiff) > 0 && Math.abs(yDiff) > 0) {
                if (!tileIn(adjTiles, {x: tile.x+xDiff, y: tile.y})) {
                    rmTiles.push(i);
                } else if (!tileIn(adjTiles, {x: tile.x, y: tile.y+yDiff})) {
                    rmTiles.push(i);
                }
            }
        }

        while (rmTiles.length > 0) { //remove unnaccessible diag tiles
            i = rmTiles.pop();
            adjTiles.splice(i, 1); 
        }

        return adjTiles;
    }

    getTileIndices(coords) {
        const tileX = this.layer.worldToTileX(coords.x - 12);
        const tileY = this.layer.worldToTileY(coords.y - 14);
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