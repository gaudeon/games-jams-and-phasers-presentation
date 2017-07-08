// namespace
var App = App || {};

App.Enemy = (function () {
    "use strict";

    var fn = function (game, x, y, args) {
        Phaser.Sprite.call(this, game, x, y, args.image_key);
        this.anchor.setTo(0.5);
        args.init(this, args);

        this.game.physics.arcade.enable(this);
        this.frame = 0;
        this.collideWorldBounds = true;
        this.speed = 50;
        this.direction = 2;
        this.time = 0;
    };


    fn.prototype = Object.create(Phaser.Sprite.prototype);
    fn.prototype.constructor = fn;

    fn.prototype.update = function () {
        var speed = this.speed;

        this.time++;
        if (this.time > 180) {
            this.time = 0;
        }

        var directions = [
            { // UP
                x: 0,
                y: -this.speed
            },
            { // DOWN
                x: 0,
                y: this.speed
            },
            { // LEFT
                x: -this.speed,
                y: 0
            },
            { // RIGHT
                x: this.speed,
                y: 0
            },
            { // STOP
                x: 0,
                y: 0
            }
        ];

        if (this.time === 0) {
            var min = 0;
            var max = 4;
            this.direction = Math.floor(
                Math.random() * (Math.floor(max) - Math.ceil(min) + 1)
            ) + min;
        }

        // Stop player every second
        if (this.time === 60) {
            this.direction = 4;
        }

        this.body.velocity.x = directions[this.direction].x;
        this.body.velocity.y = directions[this.direction].y;
        if (this.body.velocity.y > 0 && this.body.y + this.body.velocity.y > (this.game.global.maps.map.heightInPixels+30)) {
            this.body.velocity.y = 0;
        }
        if (this.body.velocity.y < 0 && this.body.y + this.body.velocity.y < -50) {
            this.body.velocity.y = 0;
        }
        if (this.body.velocity.x > 0 && this.body.x + this.body.velocity.x > (this.game.global.maps.map.widthInPixels+30)) {
            this.body.velocity.x = 0;
        }
        if (this.body.velocity.x < 0 && this.body.x + this.body.velocity.x < -50) {
            this.body.velocity.x = 0;
        }

        this.game.physics.arcade.collide(this, this.game.global.maps.layers["CrossRoad:Collision"]);
    };

    return fn;
})();
