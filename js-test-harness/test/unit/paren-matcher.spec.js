import parenMatcher from '../../src/paren-matcher.js';

const TEST_WITH_NUMBERS = '012(456)89';

describe('paren matcher', () => {
  it('can match simple', () => {
    expect(parenMatcher(TEST_WITH_NUMBERS, 3)).to.equal(7);
  })

  it('reports null match', () => {
    expect(parenMatcher(TEST_WITH_NUMBERS, 5)).to.be.NaN;
  });
});
