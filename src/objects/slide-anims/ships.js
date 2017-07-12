import SlideAnim from '../slide-anim';

export default class Ships extends SlideAnim {
    constructor (game) {
        super(game);

        // enemy ship
        this.enemyShip = new Phaser.Sprite(this.game, this.game.width / 2, 200, 'spritesAtlas', 'enemyShipG');
        this.enemyShip.anchor.x = 0.5;
        this.game.physics.arcade.enable(this.enemyShip);
        this.enemyShip.body.immovable = true;

        // bullets
        this.bullets = this.game.add.group(this);
        for (let yMod = 1; yMod < 4; yMod++) {
            const bulletX = this.game.width / 2;
            const bulletY = this.game.height + (yMod * 100);
            let bullet = new Phaser.Sprite(this.game, bulletX, bulletY, 'spritesAtlas', 'BulletGreen');
            bullet.anchor.x = 0.5;
            this.game.physics.arcade.enable(bullet);
            this.bullets.add(bullet);
        }

        // ships
        const shipX = this.game.width / 2;
        const shipY = this.game.height + (this.bullets.length + 1) * 100;
        this.ship = new Phaser.Sprite(this.game, shipX, shipY, 'spritesAtlas', 'playerShipO');
        this.ship.anchor.x = 0.5;
        this.game.physics.arcade.enable(this.ship);
    }

    play () {
        const speed = -300;

        this.add(this.enemyShip);
        this.bullets.children.forEach((bullet) => {
            bullet.body.velocity.y = speed;
        });
        this.add(this.ship);

        this.ship.body.velocity.y = speed;
    }

    update () {
        this.game.physics.arcade.collide(this.enemyShip, this.bullets, this.hit, null, this);

        this.bullets.forEachAlive((bullet) => {
            if (bullet.y < 0) {
                bullet.kill();
            }
        });

        if (this.ship.alive && this.ship.y < 0) {
            this.ship.kill();
        }
    }

    hit (ship, bullet) {
        ship.kill();
        bullet.kill();
    }
}
