// namespace
var App = App || {}; 

App.Spawner = (function () {
    "use strict";

    var fn = function (game, x, y, args) {
        Phaser.Group.call(this, game, null, '', false, true, Phaser.Physics.ARCADE);
        // args.init(this, args);

        this.game.physics.arcade.enable(this);
        this.frame = 0;
        this.collideWorldBounds = true;
        this.spawnRate = 5000;
        this.spawnEnemy(game, x, y, args);
    };  

    fn.prototype = Object.create(Phaser.Group.prototype);
    fn.prototype.constructor = fn; 

    fn.prototype.spawnEnemy = function (game, x, y, args) {
        var spawnX = x - 20;
        var spawnY = y;
        // var enemyArgs = {};
        // enemyArgs.image_key = 'rpgchars';
        // enemyArgs.frame = 'gid_1837_frame_0';
        // enemyArgs.init = function () {};
        var enemy = new App.Enemy(game, spawnX, spawnY, args);
        this.game.add.existing(enemy);

        this.spawnTimer = this.game.time.events.add(this.spawnRate, function() {
            this.spawnEnemy(game, x, y, args);
        }, this);
    }

    fn.prototype.update = function () {
        // this.game.physics.arcade.collide(this, this.game.global.forest.layers.Collisions);
    };  

    return fn; 
})();
