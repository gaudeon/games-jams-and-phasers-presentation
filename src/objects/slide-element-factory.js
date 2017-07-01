export default class SlideElementFactory {
    constructor (game, slide) {
        this.game = game;
        this.slide = slide;
    }

    text (x, y, text, style) {
        let textObj = new Phaser.Text(this.game, x, y, text, style);
        textObj.setTextBounds(x, y, this.game.width, undefined);
        return this.slide.add(textObj);
    }
}
