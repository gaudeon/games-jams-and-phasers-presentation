// namespace
var App = App || {};

App.PlayGameState = (function () {
    "use strict";

    console.log("PlayGameState Compiling ...");
    var fn = function (game) {
        console.log("PlayGameState.constructor Running...");
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function () {
        console.log("PlayGameState.init Running ...");
        this.game.assetManager.spawn(this.game.assetManager.assets.Config);
        // Connect to WebSocket server
        console.log("Connecting to WebSocket server...");
        this.game.ws = new App.WebSocket(this.game,App.WebSocketClientHooks);
    };

    fn.prototype.create = function () {
        console.log("PlayGameState.create Running ...");

        // our maps tilemap
        this.game.global.maps = this.game.assetManager.assets.tilemap.maps;

        this.game.state.start("LoadMap",false,false);

        /*this.game.add.existing(new App.FlagGreenLeft(this.game, 0, 0));
        this.game.add.existing(new App.FlagGreenRight(this.game, 100, 0));
        this.game.add.existing(new App.FlagOrangeLeft(this.game, 200, 0));
        this.game.add.existing(new App.FlagOrangeRight(this.game, 300, 0));*/
    };

    return fn;
})();
