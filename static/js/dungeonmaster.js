var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
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
    this.load.image('tiles', 'assets/tiles/drawtiles1.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/dungeon.json');
    this.load.image('sidemenu bkgd', 'assets/UI/sidemenu background.png');
}

var map;
var tileset;
var layer1;
var currentTile;
var marker;
var controls;
var menuContainer;

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

    var tiles = this.add.image(40,70,'tiles').setOrigin(0);
    var sidemenuContainer = this.add.image(0,0,'sidemenu bkgd').setOrigin(0);
    menuContainer = this.add.container(700, 0, [sidemenuContainer, tiles]);
}

function update (tile, delta) {
    controls.update(delta);

    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

    var pointerTileX = map.worldToTileX(worldPoint.x);
    var pointerTileY = map.worldToTileY(worldPoint.y);

    marker.x = map.tileToWorldX(pointerTileX);
    marker.y = map.tileToWorldY(pointerTileY);

    if (this.input.manager.activePointer.isDown) {
        map.putTileAt(currentTile, pointerTileX, pointerTileY);
    }
}
