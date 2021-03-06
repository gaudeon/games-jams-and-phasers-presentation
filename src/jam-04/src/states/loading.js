// namespace
var App = App || {};

App.LoadingState = (function () {
    "use strict";

    var fn = function (game) {
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function () {

    };

    fn.prototype.preload = function () {
        // load json configuration files
        this.load.json('assetsConfig', 'assets/json/assets.json');
    };

    fn.prototype.create = function () {

        var game = this.game;

        // Connect to WebSocket server
        console.log("Connecting to WebSocket server...");
        game.global.readyWS = false;
        game.global.eurecaClient = new Eureca.Client({ uri: 'http://localhost:8888/' });
        game.global.eurecaClient.ready(function (proxy) {
            console.log("WebSocket client is ready!");
            game.global.eurecaServer = proxy;
            console.log("WebSocket server:");
            console.log(game.global.eurecaServer);
            game.global.readyWS = true;
        });
        console.log("CLIENT!");
        console.log(game.global.eurecaClient);
        console.log("exports:");
        console.log(game.global.eurecaClient.exports);
        game.global.eurecaClient.exports.setId = function(id) {
            console.log("Server assigned myID: " + id);
            game.global.myID = id;
            game.global.eurecaServer.handshake(id);
            game.global.readyWS = true;

            // use arcade physics
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.state.start('PlayGame');

        };
        console.log("SetID function:");
        console.log(game.global.eurecaClient.exports.setId);

    };

    return fn;
})();
