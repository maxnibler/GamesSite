import { sceneEvents } from "../Events/EventCenter.js";
import Button from "../Sprites/button.js";

export default class GameUI extends Phaser.Scene {
    #tileID = 1;
    constructor () {
        super({ key: 'game-ui' });
    }

    create () {
        const menu = this.add.group({
            classtype: Phaser.GameObjects.Image
        });

        menu.create(800, 300, 'sidemenu-bkgd');
        this.spaceKey = this.input.keyboard.addKey(32);
        this.triggerLock = false;

        //Make buttons

        this.tileFloor = new Button({
            scene: this,
            key: 'tile-button',
            up: 1,
            down: 1,
            over: 1,
            x: 760,
            y: 300
        });

        this.tileFloor.on('pointerdown', () => this.tileButtonPressed(this.tileFloor.config.up), this);

        this.tileWall = new Button({
            scene: this,
            key: 'tile-button',
            up: 2,
            down: 2,
            over: 2,
            x: 840,
            y: 300
        });

        this.tileWall.on('pointerdown', () => this.tileButtonPressed(this.tileWall.config.up), this);
    }

    update () {
        if (this.spaceKey.isDown) {
            if (!this.triggerLock) {
                this.triggerLock = true;
                this.changeTileID();
                sceneEvents.emit('change-tile', this.#tileID);
            }
        }

        if (this.spaceKey.isUp) {
            this.triggerLock = false;
        }
    }

    changeTileID(delta) {
        if (this.#tileID === 1) {
            this.#tileID = 2;
        } else {
            this.#tileID = 1;
        }
    }

    tileButtonPressed (ID) {
        sceneEvents.emit('change-tile', ID);
    }
}