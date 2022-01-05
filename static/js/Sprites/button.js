export default class Button extends Phaser.GameObjects.Sprite {
    /*
    Config Params:
        scene: (required) The scene in which the button will be added
        key: (required) the key of the spritesheet
        up: the frame for button in up position
        down: the frame for button in down position
        over: the frame for button on hover
        x: the position of the button
        y: the position of the button
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
        if (!config.up) {
            config.up = 0;
        }
        if (!config.down) {
            config.down = 0;
        }
        if (!config.over) {
            config.over = 0;
        }
        if (!config.x) {
            config.x = 0;
        }
        if (!config.y) {
            config.y = 0;
        }
        //Initialize button as sprite
        super(config.scene, config.x, config.y, config.key, config.up);
        //add button to scene
        config.scene.add.existing(this);
        //set listeners
        this.setInteractive();
        this.on('pointerdown', this.onDown, this);
        this.on('pointerup', this.onUp, this);
        this.on('pointerover', this.onOver, this);
        this.on('pointerout', this.onUp, this);
        //store config
        this.config = config;
        this.emit('pointerclick', config.down);
    }

    onDown () {
        this.setFrame(this.config.down);
    }

    onOver () {
        this.setFrame(this.config.over);
    }

    onUp () {
        this.setFrame(this.config.up);
    }
}