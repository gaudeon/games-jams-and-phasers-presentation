import SlideAnim from '../slide-anim';

export default class BHLogo extends SlideAnim {
    constructor (game) {
        super(game);
        this.spriteScale = 3;

        // bh logo
        this.logo = new Phaser.Sprite(this.game, 0, 0, 'spritesAtlas', 'bh_logo');
        this.logo.scale.setTo(this.spriteScale, this.spriteScale);
        this.logo.anchor.x = this.logo.anchor.y = 0.5;
        this.logo.reset(this.game.width / 2, -this.logo.height * 3);
        this.game.physics.arcade.enable(this.logo);
        this.logo.body.collideWorldBounds = true;
        this.logo.body.bounce.y = 0.2;
        this.logo.body.gravity.y = 200;

        // position
        this.y = this.game.height - 100;
    }

    play () {
        this.add(this.logo);
        // this.logo.body.moveTo(12000, this.game.width + 600, Phaser.ANGLE_RIGHT);
    }
}
