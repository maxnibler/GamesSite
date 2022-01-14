import {Directions as dir} from '../../Utils/Constants.js'

const randomDirection = (exclude) => {
    let newDirection = Phaser.Math.Between(0, 3);
    let count = 0;
    while (newDirection === exclude && newDirection%2 === exclude%2) {
        newDirection = Phaser.Math.Between(0,3);
        if (count++ >= 10) break;
    }
    return newDirection;
}

export default class Elf extends Phaser.Physics.Arcade.Sprite {
    #direction;
    #idle;

    constructor (scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        this.anims.play('elf_m-run');
        this.direction = dir.RIGHT;
        this.idle = false;
    }

    preUpdate (t, dt) {
        super.preUpdate(t, dt);

        //console.log("elf coord:", this.x, this.y);

        const speed = 20;
        if (this.idle) {
            this.setVelocity(0, 0);
            return;
        }

        switch (this.direction) {
            case dir.UP:
                this.setVelocity(0, -speed);
                break;
            case dir.DOWN:
                this.setVelocity(0, speed);
                break;
            case dir.LEFT:
                this.setVelocity(-speed, 0);
                break;
            case dir.RIGHT:
                this.setVelocity(speed, 0);
                break;
        }
    }

    handleCollision(go, tile, body) {
        if (go !== this) {
            return;
        }

        this.direction = randomDirection(this.direction);
    }

    setDirection(newDirection) {
        if (newDirection < 0 || newDirection > 3) return 'invalid Direction';
        this.direction = newDirection;
    }

    stopMoving() {
        this.idle = true;
        this.anims.play('elf_m-idle');
    }

    isIdle() {
        return this.idle;
    }

    getCoords() {
        return {x: this.x, y: this.y};
    }
}