import { sceneEvents } from "../Events/EventCenter.js";

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
    }

    update () {
        if (this.spaceKey.isDown) {
            if (!this.triggerLock) {
                this.triggerLock = true;
                this.changeTileID();
                console.log(this.#tileID);
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
}