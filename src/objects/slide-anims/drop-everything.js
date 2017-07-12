import SlideAnim from '../slide-anim';

export default class DropEverything extends SlideAnim {
    constructor (game) {
        super(game);

        this.items = [];
        this.item = 0;

        for (let i = 1; i <= 30; i++) {
            let itemNumber = i < 10 ? `00${i}` : `0${i}`;
            let frame = `genericItem_color_${itemNumber}`;
            this.items.push(frame);
        }

        this.items.push('bh_logo');
        this.items.push('BulletGreen');
        this.items.push('enemyShipG');
        this.items.push('pacman_open');
        this.items.push('pacman_pellet');
        this.items.push('pacman_inky');
        this.items.push('playerShipO');
    }

    play () {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.05, this.items.length, this.drop, this);
    }

    drop () {
        let frame = this.items[this.item];
        let item = new Phaser.Sprite(this.game, this.game.rnd.between(this.game.width / 2 - 500, this.game.width / 2 + 500), -200, 'spritesAtlas', frame);
        if (frame.match(/genericItem/)) {
            item.scale.x = item.scale.y = 0.5;
        } else if (frame.match(/pacman/)) {
            item.scale.x = item.scale.y = 3;
        } else {
            item.scale.x = item.scale.y = 2;
        }
        item.anchor.x = 0.5;
        this.game.physics.arcade.enable(item);
        item.body.gravity.y = 200;
        item.body.collideWorldBounds = true;
        item.body.bounce.x = item.body.bounce.y = 0.15;
        this.add(item);

        this.item++;
    }
}
