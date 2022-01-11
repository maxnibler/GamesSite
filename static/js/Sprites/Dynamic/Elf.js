const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

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

    constructor (scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        this.anims.play('elf_m-idle');
        this.direction = RIGHT;

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleCollision, this);
    }

    preUpdate (t, dt) {
        super.preUpdate(t, dt);

        const speed = 20;

        switch (this.direction) {
            case UP:
                this.setVelocity(0, -speed);
                break;
            case DOWN:
                this.setVelocity(0, speed);
                break;
            case LEFT:
                this.setVelocity(-speed, 0);
                break;
            case RIGHT:
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
}