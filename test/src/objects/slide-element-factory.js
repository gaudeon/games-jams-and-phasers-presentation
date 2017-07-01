import SlideElementFactory from '../../../src/objects/slide-element-factory';

describe('SlideElementFactory', () => {
    let slideElementFactory;

    describe('constructor()', () => {
        it('generates an object', () => {
            slideElementFactory = new SlideElementFactory(game);

            assert.isObject(slideElementFactory);
        });
    });
});
