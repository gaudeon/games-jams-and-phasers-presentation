// json imports
import spritesJSON from '../../assets/json/sprites.json';

// require in other assets to be included but not added to cache at this time
require('../../assets/images/sprites.png');

export default class LoadingState extends Phaser.State {
    preload () {
        // load json configuration files
        this.game.cache.addJSON('spritesJSON', null, spritesJSON);
    }

    create () {
        // arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        Reveal.addEventListener('slidechanged', (event) => {
            // event.previousSlide, event.currentSlide, event.indexh, event.indexv
            this.state.start('Play', true, false, event.indexh, event.indexv);
        });

        Reveal.initialize();

        this.state.start('Play', true, false);
    }
}
