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

function create () {
    //Create tilemap
    map = this.make.tilemap({ key: 'map' });
    //Add tileset to map
    tileset = map.addTilesetImage('Cave', 'tiles');
    //Create Blank Layer
    layer1 = map.createLayer('Floor1', tileset, 0, 0);
}

function update () {

}
