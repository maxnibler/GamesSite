import { sceneEvents } from "../Events/EventCenter.js";
import { createElfMaleAnims } from "../Sprites/Anims/AdventurerAnims.js";
import Elf from "../Sprites/Dynamic/Elf.js";
import AdventurerBehavior from "../Sprites/Controllers/AdventurerBehavior.js";

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
        this.load.atlas('elf_m', 'assets/sprites/characters/adventurers/elf_m.png', 'assets/sprites/characters/adventurers/elf_m.json')
    }

    create () {
        this.scene.run('game-ui');
        //Create tilemap
        this.map = this.make.tilemap({ key: 'map' });
        //Add tileset to this.map
        const tileset = this.map.addTilesetImage('Cave', 'tiles');
        //Load the layer from tileset
        this.floor1 = this.map.createLayer('Floor1', tileset, 0, 0);
        //Set collision for the layer
        this.floor1.setCollisionByProperty({collides: true});

        this.currentTile = this.map.getTileAt(1,1);
    
        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

        //Create Camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        
        //Create controls for camera
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

        //Listen for change tile event
        sceneEvents.on('change-tile', this.handleChangeTile, this);

        createElfMaleAnims(this.anims);

        //create a group for adventurers
        const adventurers = this.physics.add.group({
            classType: Elf,
            createCallback: (go) => {
                const elfGo = go;
                elfGo.body.onCollide = true;
            }
        });

        this.adventurersList = [adventurers.get(88, 44, 'elf_m', 'elf_m_idle_anim_f0.png')];

        this.adventurerAI = new AdventurerBehavior(this, this.adventurersList, this.floor1);
        this.adventurerAI.create();

        //adventurersList.push(adventurers.get(140, 44, 'elf_m', 'elf_m_idle_anim_f0.png'));

        this.floor1Collider = this.physics.add.collider(adventurers, this.floor1);

        //Create debuger for collision on walls
        /*
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        this.floor1.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        });
        */
    }

    update (tile, delta) {
        this.controls.update(delta);
    
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        const pointerTileX = this.map.worldToTileX(worldPoint.x);
        const pointerTileY = this.map.worldToTileY(worldPoint.y);
    
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);

        this.adventurerAI.update();

        if (this.input.manager.activePointer.isDown) {
            this.floor1.putTileAt(this.currentTile, pointerTileX, pointerTileY);
            this.floor1.setCollisionByProperty({collides: true});
        }
    }

    handleChangeTile(tileID) {
        let tile = this.floor1.findByIndex(tileID);
        //console.log(tile);
        this.currentTile = tile;
    }
}