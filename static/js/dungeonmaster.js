var config = {
    type: Phaser.AUTO,
    width: 915,
    height: 600,
    parent: "gameDiv",
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render,
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('background', 'images/placeholder.jpg');
}

function create () {
    this.add.image(400,300, 'background');
    console.log("create");
}

function update () {

}

function render () {
    let x = 32;
    let y = 0;
    let yi = 32;

    
}