// json imports
import spritesJSON from '../../assets/json/sprites.json';

// web fonts
import WebFont from 'webfontloader';

// require in other assets to be included but not added to cache at this time
require('../../assets/images/sprites.png');
require('../../assets/css/fonts.css'); // arcade-classic
require('../../assets/fonts/ARCADECLASSIC.TTF'); // arcade-classic

export default class LoadingState extends Phaser.State {
    init () {
        // font loading requirements
       this.requireWebFont('ARCADECLASSIC');
    }

    preload () {
        // load json configuration files
        this.game.cache.addJSON('spritesJSON', null, spritesJSON);

        // font loading (only call loadWebFonts once)
       this.loadWebFonts('ARCADECLASSIC');
    }

    create () {
        // arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        Reveal.addEventListener('slidechanged', (event) => {
            // event.previousSlide, event.currentSlide, event.indexh, event.indexv
            this.state.start('Play', true, false, event.indexh, event.indexv);
        });
    }

    update () {
        if (this.areWebfontsLoaded()) {
            Reveal.initialize();

            this.state.start('Play', true, false);
        }
    }

    requireWebFont (fontKey) {
        this.webfonts = this.webfonts || {};

        this.webfonts[fontKey] = false;
    }

    setWebFontLoaded (fontKey) {
        this.webfonts = this.webfonts || {};

        this.webfonts[fontKey] = true;
    }

    loadWebFonts (...fontKeys) {
        let familyList = [];

        _.each(fontKeys, (key) => {
            familyList.push(key);
        });

        WebFont.load({
            active: () => {
                _.each(fontKeys, (key) => {
                    this.setWebFontLoaded(key);
                });
            },
            custom: {
                families: familyList,
                urls: ['/assets/fonts.css']
            }
        });
    }

    areWebfontsLoaded () {
        this.webfonts = this.webfonts || {};

        for (let fontKey in this.webfonts) {
            if (!this.webfonts[fontKey]) {
                return false;
            }
        }

        return true;
    }
}
