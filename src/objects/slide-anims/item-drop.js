import SlideAnim from '../slide-anim';

export default class ItemDrop extends SlideAnim {
    constructor (game) {
        super(game);

        this.item = 1;
    }

    play () {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.05, 30, this.addTool, this);
    }

    addTool () {
        let itemNumber = this.item < 10 ? `00${this.item}` : `0${this.item}`;
        let frame = `genericItem_color_${itemNumber}`;
        let item = new Phaser.Sprite(this.game, this.game.rnd.between(this.game.width / 2 - 500, this.game.width / 2 + 500), -200, 'spritesAtlas', frame);
        item.scale.x = item.scale.y = 0.5;
        item.anchor.x = 0.5;
        this.game.physics.arcade.enable(item);
        item.body.gravity.y = 200;
        item.body.collideWorldBounds = true;
        item.body.bounce.x = item.body.bounce.y = 0.15;
        this.add(item);

        this.item++;
    }
}
