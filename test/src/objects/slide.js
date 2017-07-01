import Slide from '../../../src/objects/slide';

describe('Slide', () => {
    let slide;

    describe('constructor()', () => {
        it('generates an object', () => {
            slide = new Slide(game);

            assert.isObject(slide);
        });
    });
});
