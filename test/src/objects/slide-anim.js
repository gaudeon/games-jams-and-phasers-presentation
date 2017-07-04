import SlideAnim from '../../../src/objects/slide-anim';

describe('SlideAnim', () => {
    let slideAnim;

    describe('constructor()', () => {
        it('generates an object', () => {
            slideAnim = new SlideAnim(game);

            assert.isObject(slideAnim);
        });
    });
});
