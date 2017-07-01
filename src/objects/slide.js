import SlideElementFactory from './slide-element-factory';

export default class Slide extends Phaser.Group {
    constructor (game) {
        super(game);

        this.factory = new SlideElementFactory(game, this);

        this.visible = false;
    }
}
