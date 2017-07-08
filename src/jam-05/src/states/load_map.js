// namespace
var App = App || {};

App.LoadMapState = (function () {
    "use strict";

    console.log("LoadMapState Compiling ...");
    var fn = function (game) {
        console.log("LoadMapState.constructor Running...");
        Phaser.State.call(this, game);
    };

    fn.prototype = Object.create(Phaser.State.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.init = function (map = "CrossRoad") {
        console.log("LoadMapState.init Running ...");
        this.map              = map;
        this.map_re           = new RegExp(map);
        this.map_bottom_layer = _.find(Object.keys(this.game.global.maps.layers), (layer) => { return layer.match(this.map_re); });
        this.collision_maps   = _.filter(Object.keys(this.game.global.maps.layers), (layer) => { return layer.match(this.map_re) && this.game.global.maps.layers[layer].layer.properties.isCollisionLayer; });

        console.log("Loading Map " + map);
        this.game.assetManager.filterlayers("maps", this.map);
        this.game.global.player.setCurrentMap(this.map);
        this.game.global.player.setCollisionMaps(this.collision_maps);
    };

    fn.prototype.create = function () {
        console.log("LoadMapState.create Running ...");

        // resize world to fit the layers
        this.game.global.maps.layers[this.map_bottom_layer].resizeWorld();

        this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKWARD_SLASH);
        this.key1.onDown.add(fn.prototype.enterMessage, this);

        /*this.game.add.existing(new App.FlagGreenLeft(this.game, 0, 0));
        this.game.add.existing(new App.FlagGreenRight(this.game, 100, 0));
        this.game.add.existing(new App.FlagOrangeLeft(this.game, 200, 0));
        this.game.add.existing(new App.FlagOrangeRight(this.game, 300, 0));*/
    };

    fn.prototype.update = function () {

    };

    fn.prototype.doLogin = function (name) {
        var p = this.game.global.player;
        this.game.ws.server.login(name,p.body.position.x,p.body.position.y, function (result) {
            //console.log("[DEBUG] server.login(" + name + ") = " + result);
            if (result) {
                p.playerName = name;
                p.usernameText.text = name;
                console.log("Logged in as: " + name);
            }
            else {
                console.log("FAILED TO LOGIN AS: " + name);
            }
        });
    };

    fn.prototype.doChat = function (message) {
        this.game.ws.server.chat(message, function (result) {
            //console.log("[DEBUG] server.chat(" + message + ") = " + result);
            if (!result) {
                console.log("Please /login before chatting.");
            }
        });
    };

    fn.prototype.enterMessage = function () {
        var defaultPrompt = this.game.global.player.playerName ? 'blah' : '/login ';
        var message = prompt("Type command or message", defaultPrompt);
        if (message) {
            var contents = message.split(" ");
            if (contents[0] == '/login') {
                // XXX: Should we require a password too?
                this.doLogin(contents[1]);
            }
            else if (contents[0] == '/tell') {
                var realMessage = message.replace(/^\/tell\s+(\S+)\s*(.+)/gi, '$1');
                console.log(this.game.global.player.playerName+" tells "+contents[1]+" the message '"+realMessage+"'");
                // Once Multiplayer is working, then pass the message to the other player's console
            }
            else if (contents[0] == '/logout') {
                this.game.global.player.playerName = '';
                console.log("You are now logged out");
            }
            else if (contents[0].substr(0,1) == '/') {
                console.log("Unknown command: " + contents[0]);
            }
            else {
                // Client is speaking. Send message to server.
                this.doChat(message);
            }
        }
    }

    return fn;
})();
