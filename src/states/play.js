import Pacman from '../objects/slide-anims/pacman';
import BHLogo from '../objects/slide-anims/bh-logo';
import BHPacman from '../objects/slide-anims/bh-pacman';

export default class PlayState extends Phaser.State {
    init (slideIndexH = 0, slideIndexV = 0) {
        this.slideIndexH = slideIndexH;
        this.slideIndexV = slideIndexV;
    }

    preload () {
        this.game.load.atlas('spritesAtlas', '/assets/sprites.png', null, this.game.cache.getJSON('spritesJSON'), Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    }

    create () {
        let anim;

        switch (this.slideIndexH) {
            case 1:
                anim = new Pacman(this.game);
                break;
            case 2:
                anim = new BHLogo(this.game);
                break;
            case 3:
                anim = new BHPacman(this.game);
                break;
        }

        if (typeof anim !== 'undefined') {
            anim.play();
        }
    }
};
