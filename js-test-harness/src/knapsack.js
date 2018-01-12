// https://www.hackerrank.com/challenges/unbounded-knapsack/

function maxKnapsackValue(items, bagSize) {
  let room = bagSize;
  while (true ){
    const r = smallestRemainder(items, room);
    if (r===Infinity) {
      return bagSize - room;
    } else {
      room = r;
    }
  }
}

export default maxKnapsackValue;
export function biggestLessThan(items, upperBound) {
  const sorted = items.sort((a,b)=>a-b).reverse();
  return sorted.find(x => x < upperBound);
}

export function smallestRemainder(items, room) {
  const remainders = items.filter( x => x <= room).
        map(x => room % x);
  return remainders.reduce((soFar, cur) => Math.min(soFar, cur), Infinity);

}
