const UP = 0;
const DOWN = 1;
const RIGHT = 2;
const LEFT = 3;

const randomDirection = (exclude) => {
    let newDirection = Phaser.Math.Between(0, 3);
    while (newDirection === exclude) {
        newDirection = Phaser.Math.Between(0,3);
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