import { sceneEvents } from "../Events/EventCenter.js";

export default class MainScene extends Phaser.Scene {
    constructor () {
        super('Main');
    }

    preload () {
        this.load.image('tiles', 'assets/tiles/drawtiles1.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/dungeon.json');
        this.load.image('sidemenu-bkgd', 'assets/UI/sidemenu background.png');
        this.load.image('gold-icon', 'assets/UI/gold coin.jpg');
        this.load.spritesheet('tile-button', 'assets/tiles/drawtiles1.png', 
            { 
                frameWidth: 32, 
                frameHeight: 32,
                margin: 1,
                spacing: 2,
            });
    }

    create () {
        this.scene.run('game-ui');
        //Create tilemap
        this.map = this.make.tilemap({ key: 'map' });
        //Add tileset to this.map
        const tileset = this.map.addTilesetImage('Cave', 'tiles');
        //Load the layer from tileset
        const layer1 = this.map.createLayer('Floor1', tileset, 0, 0);

        this.currentTile = this.map.getTileAt(1,1);
    
        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    
        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5,
        };
        
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        sceneEvents.on('change-tile', this.handleChangeTile, this);
    }

    update (tile, delta) {
        this.controls.update(delta);
    
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        const pointerTileX = this.map.worldToTileX(worldPoint.x);
        const pointerTileY = this.map.worldToTileY(worldPoint.y);
    
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);

        if (this.input.manager.activePointer.isDown) {
            this.map.putTileAt(this.currentTile, pointerTileX, pointerTileY);
        }
    }

    handleChangeTile(tileID) {
        this.currentTile = tileID;
    }
}