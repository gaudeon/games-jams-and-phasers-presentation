// namespace
var App = App || {};

App.Item = (function () {
    "use strict";

    var fn = function (game, x, y, args) {
        Phaser.Sprite.call(this, game, x, y, args.image_key);

        // Create animation linked to this object
        if (args.init) args.init(this, args);

        this.game.physics.arcade.enable(this);

        this.amount = 0;

    };

    fn.prototype = Object.create(Phaser.Sprite.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.getAmount = function () {
        return this.amount;
    };

    fn.prototype.setAmount = function (amount) {
        this.count = amount;
    };

    return fn;
})();
