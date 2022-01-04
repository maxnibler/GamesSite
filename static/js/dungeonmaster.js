var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 576,
    parent: "gameDiv",
    backgroundColor: '#efefef',
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('tiles', ['assets/tiles/drawtiles1.png', 'assets/tiles/drawtiles1_n.png']);
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/dungeon.json');
}

var map;
var tileset;
var layer1;
var currentTile;
var marker;
var controls;

function create () {
    //Create tilemap
    map = this.make.tilemap({ key: 'map' });
    //Add tileset to map
    tileset = map.addTilesetImage('Cave', 'tiles');
    //Create Blank Layer
    layer1 = map.createLayer('Floor1', tileset, 0, 0);

    currentTile = map.getTileAt(1,1);

    marker = this.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    var cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5,
    };

    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
}

function update (tile, delta) {
    controls.update(delta);

    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

    var pointerTileX = map.worldToTileX(worldPoint.x);
    var pointerTileY = map.worldToTileY(worldPoint.y);

    marker.x = map.tileToWorldX(pointerTileX);
    marker.y = map.tileToWorldY(pointerTileY);
}
