export default class Adventurer extends Phaser.Physics.Arcade.Sprite {
    /*
    Config Params:
        scene: (required) The scene in which the character will be added
        key: (required) the key of the spritesheet
        x: the position of the button
        y: the position of the button
        frame: the initial frame of the sprite
    */
    constructor (config) {
        //Parsing config and checking for missing items
        if (!config.scene) {
            console.log("No Scene Specified");
            return;
        }
        if (!config.key) {
            console.log("No Key Specified");
            return;
        }
        if (!config.x) {
            config.x = 44;
        }
        if (!config.y) {
            config.y = 44;
        }
        if (!config.frame) {
            config.frame = 0;
        }
        super(scene, x, y, key, frame);
    }
}