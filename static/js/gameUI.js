export default class GameUI extends Phaser.Scene {
    constructor () {
        super({ key: 'game-ui' });
    }

    create () {
        const gold = this.add.group({
            classtype: Phaser.GameObjects.Image
        })

        gold.createMultiple({
            key: 'gold-icon',
            setXY: {
                x: 20,
                y: 20,
                stepX: 16,
            },
            quantity: 1
        })
    }
}