import Pacman from '../objects/slide-anims/pacman';
import BHLogo from '../objects/slide-anims/bh-logo';
import BHPacman from '../objects/slide-anims/bh-pacman';

export default class PlayState extends Phaser.State {
    init (previousSlide, currentSlide, slideIndexH = 0, slideIndexV = 0) {
        const PRESENTATION_TIME = 40 * 60; // minutes * seconds

        this.previousSlide = previousSlide;
        this.currentSlide = currentSlide;
        this.slideIndexH = slideIndexH;
        this.slideIndexV = slideIndexV;

        this.numSlides = global.NUM_SLIDES; // from index.html
        this.timePerSlide = Math.floor(PRESENTATION_TIME / this.numSlides);
        this._remainingTime = this.timePerSlide;

        if (typeof this.game.slidesSeen === 'undefined') {
            this.slidesSeen = this.game.slidesSeen = {};
        } else {
            this.slidesSeen = this.game.slidesSeen;
        }

        this.thisSlideSeen = false;
        if (this.slidesSeen[this.slideIndexH]) {
            this.thisSlideSeen = true;
        } else {
            this.slidesSeen[this.slideIndexH] = {
                timeRemaining: this.timePerSlide
            };
        }
    }

    preload () {
        this.game.load.atlas('spritesAtlas', '/assets/sprites.png', null, this.game.cache.getJSON('spritesJSON'), Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    }

    create () {
        let screenThird = this.game.width / 3;

        // 1UP
        const textOneUpX = 0;
        const textOneUpY = 0;
        this.textOneUp = this.game.add.text(textOneUpX, textOneUpY, '1UP', {
            fill: 'red',
            stroke: 'red',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        this.textOneUp.setTextBounds(0, 0, screenThird, this.textOneUp.height);

        // 1UP Score
        const oneUpScoreFormatted = this.currentScore;
        const textOneUpScoreX = 0;
        const textOneUpScoreY = 32;
        this.textOneUpScore = this.game.add.text(textOneUpScoreX, textOneUpScoreY, oneUpScoreFormatted, {
            fill: 'white',
            stroke: 'white',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        this.textOneUpScore.setTextBounds(0, 0, screenThird, this.textOneUpScore.height);

        // Scoring Timer
        const textScoringTimerX = screenThird;
        const textScoringTimerY = 0;
        this.textScoringTimer = this.game.add.text(textScoringTimerX, textScoringTimerY, this.remainingTime, {
            fill: 'white',
            stroke: 'white',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        this.textScoringTimer.setTextBounds(0, 0, screenThird, this.textScoringTimer.height);
        if (this.thisSlideSeen) {
            this.textScoringTimer.visible = false;
        }

        // High Score
        const textHighScoreX = screenThird * 2;
        const textHighScoreY = 0;
        this.textHighScore = this.game.add.text(textHighScoreX, textHighScoreY, 'High   Score', {
            fill: 'red',
            stroke: 'red',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        this.textHighScore.setTextBounds(0, 0, screenThird, this.textHighScore.height);

        // High Score Score
        const textHighScoreAmountX = screenThird * 2;
        const textHighScoreAmountY = 32;
        this.textHighScoreAmount = this.game.add.text(textHighScoreAmountX, textHighScoreAmountY, this.possibleHighScore, {
            fill: 'white',
            stroke: 'white',
            font: '32pt ARCADECLASSIC',
            boundsAlignH: 'center'
        });
        this.textHighScoreAmount.setTextBounds(0, 0, screenThird, this.textHighScoreAmount.height);

        // run a slide animation if there is one for current slide...
        let anim;

        if (this.currentSlide && this.currentSlide.dataset && this.currentSlide.dataset.slideAnim) {
            let AnimClass = this.slideAnimMap[this.currentSlide.dataset.slideAnim];

            if (AnimClass) {
                anim = new AnimClass(this.game);
            }
        }

        if (anim) {
            anim.play();
        }

        if (!this.thisSlideSeen) {
            this.game.time.events.repeat(Phaser.Timer.SECOND, this.timePerSlide, this.countDown, this);
        }
    }

    countDown () {
        this._remainingTime--;
        this.textScoringTimer.text = this.remainingTime;
    }

    get remainingTime () {
        let minutes = Math.floor(this._remainingTime / 60);
        let seconds = this._remainingTime - minutes * 60;

        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${minutes}:${seconds}`;
    }

    get currentScore () {
        let currentScore = 0;

        let slides = Object.keys(this.slidesSeen);

        slides.forEach((slide) => {
            if ((slide != this.slideIndexH || (slide == this.slideIndexH && this.thisSlideSeen)) && this.slidesSeen[slide].timeRemaining > 0) {
                currentScore += 101 - Math.floor(this.slidesSeen[slide].timeRemaining / this.timePerSlide * 100) + 100;
            }
        });

        let currentScoreText = '';

        [10000, 1000, 100, 10].forEach((place) => {
            currentScoreText += place > currentScore ? '0' : '';
        });

        currentScoreText += `${currentScore}`;

        return currentScoreText;
    }

    get possibleHighScore () {
        let highScore = 100 * this.numSlides * 2;

        let highScoreText = '';

        [10000, 1000, 100, 10].forEach((place) => {
            highScoreText += place > highScore ? '0' : '';
        });

        highScoreText += `${highScore}`;

        return highScoreText;
    }

    get slideAnimMap () {
        return {
            Pacman: Pacman,
            BHLogo: BHLogo,
            BHPacman: BHPacman
        };
    }

    shutdown () {
        if (!this.thisSlideSeen) {
            this.slidesSeen[this.slideIndexH].timeRemaining = this._remainingTime;
        }
    }
};
