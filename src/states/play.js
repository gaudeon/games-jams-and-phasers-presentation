import Pacman from '../objects/slide-anims/pacman';
import BHLogo from '../objects/slide-anims/bh-logo';
import BHPacman from '../objects/slide-anims/bh-pacman';

export default class PlayState extends Phaser.State {
    init (slideIndexH = 0, slideIndexV = 0) {
        this.slideIndexH = slideIndexH;
        this.slideIndexV = slideIndexV;
    }

    preload () {
        this.game.load.atlas('spritesAtlas', '/assets/sprites.png', null, this.game.cache.getJSON('spritesJSON'), Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    }

    create () {
        let screenThird = this.game.width / 3;

        // 1UP
        const textOneUpX = 0;
        const textOneUpY = 0;
        let textOneUp = this.game.add.text(textOneUpX, textOneUpY, '1UP', {
            fill: 'red',
            stroke: 'red',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        textOneUp.setTextBounds(textOneUpX, textOneUpY, screenThird, textOneUpY.height);

        // 1UP Score
        const oneUpScore = this.slideIndexH * 100;
        const oneUpScoreFormatted = oneUpScore === 0 ? '0000000' : oneUpScore > 1000 ? '000' + oneUpScore : '0000' + oneUpScore;
        const textOneUpScoreX = 0;
        const textOneUpScoreY = 16;
        let textOneUpScore = this.game.add.text(textOneUpScoreX, textOneUpScoreY, oneUpScoreFormatted, {
            fill: 'white',
            stroke: 'white',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        textOneUpScore.setTextBounds(textOneUpScoreX, textOneUpScoreY, screenThird, textOneUpScoreY.height);

        // High Score
        const textHighScoreX = screenThird;
        const textHighScoreY = 0;
        let textHighScore = this.game.add.text(textHighScoreX, textHighScoreY, 'High   Score', {
            fill: 'red',
            stroke: 'red',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        textHighScore.setTextBounds(textHighScoreX, textHighScoreY, screenThird, textHighScoreY.height);

        // High Score Score
        const highScoreAmountFormatted = '3333360';
        const textHighScoreAmountX = screenThird;
        const textHighScoreAmountY = 16;
        let textHighScoreAmount = this.game.add.text(textHighScoreAmountX, textHighScoreAmountY, highScoreAmountFormatted, {
            fill: 'white',
            stroke: 'white',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        textHighScoreAmount.setTextBounds(textHighScoreAmountX, textHighScoreAmountY, screenThird, textHighScoreAmountY.height);

        let anim;

        switch (this.slideIndexH) {
            case 1:
                anim = new Pacman(this.game);
                break;
            case 2:
                anim = new BHLogo(this.game);
                break;
            case 3:
                anim = new BHPacman(this.game);
                break;
        }

        if (typeof anim !== 'undefined') {
            anim.play();
        }
    }
};
