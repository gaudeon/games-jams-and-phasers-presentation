import SlideAnim from '../slide-anim';

export default class Pacman extends SlideAnim {
    constructor (game) {
        super(game);
        this.spriteScale = 3;

        // pellets
        let testPellet = new Phaser.Sprite(this.game, 0, 0, 'spritesAtlas', 'pacman_pellet');
        testPellet.scale.setTo(this.spriteScale, this.spriteScale);

        this.numPellets = this.game.width / (testPellet.width + testPellet.width * 0.5);

        this.pellets = [];
        for (let i = 0; i < this.numPellets; i++) {
            let pellet = new Phaser.Sprite(this.game, 0, 0, 'spritesAtlas', 'pacman_pellet');
            pellet.scale.setTo(this.spriteScale, this.spriteScale);
            pellet.anchor.x = pellet.anchor.y = 0.5;
            pellet.outOfBoundsKill = true;

            let x = i * pellet.width + i * pellet.width * 0.5;
            pellet.reset(x, 0);
            this.game.physics.arcade.enable(pellet);
            pellet.body.mass = 0;

            this.pellets.push(pellet);
        }

        // pacman
        this.pacman = new Phaser.Sprite(this.game, 0, 0, 'spritesAtlas', 'pacman_open');
        this.pacman.scale.setTo(this.spriteScale, this.spriteScale);
        this.pacman.anchor.x = this.pacman.anchor.y = 0.5;
        this.pacman.animations.add('chomp', ['pacman_open', 'pacman_closed'], 10, true);
        this.pacman.animations.play('chomp');
        this.pacman.outOfBoundsKill = true;
        this.game.physics.arcade.enable(this.pacman);

        // inky
        this.inky = new Phaser.Sprite(this.game, 0, 0, 'spritesAtlas', 'pacman_inky');
        this.inky.scale.setTo(this.spriteScale, this.spriteScale);
        this.inky.anchor.x = this.inky.anchor.y = 0.5;
        this.inky.outOfBoundsKill = true;
        this.inky.reset(-this.inky.width * 2, 0);
        this.game.physics.arcade.enable(this.inky);

        // position
        this.y = this.game.height - 100;
    }

    play () {
        this.pelletCount = 0;

        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.01, this.numPellets, this.createPellet, this);
    }

    createPellet () {
        this.add(this.pellets[this.pelletCount]);

        this.pelletCount++;

        if (this.pelletCount >= this.numPellets) {
            this.createActors();
        }
    }

    createActors () {
        this.add(this.pacman);
        this.pacman.body.velocity.x = 300;

        this.add(this.inky);
        this.inky.body.velocity.x = 300;
    }

    update () {
        this.pellets.forEach((pellet) => {
            if (this.game.physics.arcade.distanceBetween(this.pacman, pellet, true) <= 30) {
                pellet.kill();
            }
        });
    }

    collideWithPellet (pacman, pellet) {
        pellet.kill();
    }
}
