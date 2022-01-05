import MainScene from "./MainScene.js";
import GameUI from "./gameUI.js";

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    parent: "gameDiv",
    backgroundColor: '#efefef',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [MainScene, GameUI]
}

export default new Phaser.Game(config);