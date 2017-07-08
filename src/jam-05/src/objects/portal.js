// namespace
var App = App || {};

App.Portal = (function () {
    "use strict";

    var fn = function (game, x, y, args) {
        Phaser.Sprite.call(this, game, x, y, args.image_key, args.frame);

        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
    };

    fn.prototype = Object.create(Phaser.Sprite.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.update = function () {
        if (this.game.global.player.getCurrentMap() == this.src_map) {
            this.game.physics.arcade.collide(this, this.game.global.player, () => {
                this.teleport();
            });
        }
    };

    fn.prototype.teleport = function () {
        this.game.state.start("LoadMap", false, false, this.dst_map);
    };

    return fn;
})();
