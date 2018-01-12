import maxKnapsackValue , {biggestLessThan,smallestRemainder} from '../../src/knapsack.js';

describe('Knapsack', () => {


  function expectMaxValue(items, bagSize, expectedValue, msg = 'unnamed') {
    expect(maxKnapsackValue(items,bagSize)).to.equal(expectedValue, msg);
  };

  it('returns the trivial case one item', function() {
    const items = [5];
    expectMaxValue([5],5,5, 'exact match');
    expectMaxValue([5],6,5, 'room for one more');
    expectMaxValue([5],10,10, 'room for two of the one thing');
  });

  it('returns several items', function() {
    const items = [3,5];
    expectMaxValue(items,5,5, 'just one');
    expectMaxValue(items,3,3, 'just one 3');
    expectMaxValue(items,8,8, 'both');
    expectMaxValue(items,7,6, 'two of 3');
    expectMaxValue(items,9,9, 'nine');
    expectMaxValue(items,10,10, 'ten');

  });

 describe('biggestlessthan', function(){
    it('is right', function() {
      expect(biggestLessThan([5,22,55,556], 5)).to.equal(undefined);
      expect(biggestLessThan([5,22,55,556], 6)).to.equal(5);
      expect(biggestLessThan([5,22,55,556], 700)).to.equal(556);
      expect(biggestLessThan([5,22,55,556], 55)).to.equal(22, 'not 55');
      expect(biggestLessThan([5,22,55,556], 54)).to.equal(22, 'not 56');
    });
  });

  describe('smallestRemainder', function(){
    it('is right', function() {
      expect(smallestRemainder([5,22,55,556], 5)).to.equal(0);
      expect(smallestRemainder([5,22,55,556], 6)).to.equal(1);
      expect(smallestRemainder([5,22,55,556], 700)).to.equal(0);
      expect(smallestRemainder([5,22,55,556], 55)).to.equal(0, 'not 55');
      expect(smallestRemainder([5,22,55,556], 54)).to.equal(4);
      expect(smallestRemainder([22,55,556], 54)).to.equal(10);
      expect(smallestRemainder([5,22,556], 54)).to.equal(4);
      expect(smallestRemainder([5,22,55,556], 66)).to.equal(0);
      expect(smallestRemainder([5,22,55,556], 69)).to.equal(3);

    });
    it('is inf', function() {
      expect(smallestRemainder([8,9,7],5)).to.equal(Infinity);
    });
  });

});
