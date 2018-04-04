import parenMatcher from '../../src/paren-matcher.js';

const TEST_WITH_NUMBERS = '012(456)89';
const TEST_WITH_NESTED = '01(3(5)7())';
const TEST_UNBALANCED = '01(3(5)';
const TEST_UNDERFLOW = '01()))';
const TEST_CAKE = "Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing."

describe('paren matcher', () => {
  it('can match simple', () => {
    expect(parenMatcher(TEST_WITH_NUMBERS, 3)).to.equal(7);
  });

  it('can match nested outside', () => {
    expect(parenMatcher(TEST_WITH_NESTED, 2)).to.equal(10);
  });

  it('matches interview cake challenge', () => {
    expect(parenMatcher(TEST_CAKE, 10)).to.equal(79);
  });

  it('can match nested inside', () => {
    expect(parenMatcher(TEST_WITH_NESTED, 4)).to.equal(6);
  });

  it('refuses  to match unbalanced', () => {
    expect(parenMatcher(TEST_UNBALANCED, 2)).to.be.NaN;
  })

  it('handles underflow', () => {
    expect(parenMatcher(TEST_UNDERFLOW, 3)).to.be.NaN;
  });

  it('refuses to match closing', () => {
    expect(parenMatcher(TEST_WITH_NUMBERS, 7)).to.be.NaN;
  });

  it('reports null match', () => {
    expect(parenMatcher(TEST_WITH_NUMBERS, 5)).to.be.NaN;
  });
});
