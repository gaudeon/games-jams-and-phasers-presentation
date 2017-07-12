// import states
import BootState from './states/boot';
import PlayState from './states/play';

require('./index.html');
require('../node_modules/reveal/index.css');
require('../node_modules/reveal/theme/night.css');
require('../node_modules/highlight.js/styles/zenburn.css');

let game = new Phaser.Game('100', '100', Phaser.AUTO, '', null, true, true, null);

Phaser.Device.whenReady(function () {
    // plugins
    game.__plugins = game.__plugins || {};

    // add plugins here
    // ...

    // setup global namespace under game for our global data
    game.global = {};

    // states
    game.state.add('Boot', BootState);
    game.state.add('Play', PlayState);

    game.state.start('Boot');
});
