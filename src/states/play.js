import Slide from '../objects/slide';

export default class PlayState extends Phaser.State {
    init (slideIndex = 0) {
        this.slideIndex = 0;
    }

    create () {
        this.slides = [];
        let slidesJSON = this.game.cache.getJSON('slidesConfig');

        slidesJSON.forEach((slideJSON) => {
            let slide = new Slide(this.game);

            slideJSON.forEach((slideElementJSON) => {
                switch (slideElementJSON.type) {
                    case 'text':
                        slide.factory.text(
                            slideElementJSON.x || 0,
                            slideElementJSON.y || 0,
                            slideElementJSON.text || '',
                            slideElementJSON.style || {}
                        );
                        break;
                }
            });

            this.slides.push(slide);
        });

        this.slides[this.slideIndex].visible = true;
    }
};
