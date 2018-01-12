import stacker from '../../src/stacker';

describe('stacker', () => {
  describe('foo function', () => {
    beforeEach(() => {
      spy(stacker, 'foo');
      stacker.foo();
    });

    it('should have been run once', () => {
      expect(stacker.foo).to.have.been.calledOnce;
    });

    it('should have always returned 27', () => {
      expect(stacker.foo).to.have.always.returned(27);
    });
  });
});
