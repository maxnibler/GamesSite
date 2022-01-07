export default class Elf extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, key, frame) {
        super(scene, x, y, key, frame);
    }

    setAnimation(animation) {
        this.anims.play(animation);
    }
}