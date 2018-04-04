/**
 * based on problem at https://www.interviewcake.com/question/javascript/matching-parens?
 * @param input
 * @param openParenIndex
 * @returns {null}
 */
export default function parenMatcher(input, openParenIndex) {
  const arr = input.split('');

  // I'm going through serious dorking around to avoid
  // mutating anything. I'm not sure it's worth it,
  // except as an exercise.

  let {opens, pairs} = arr.reduce((acc, curr, index) => {
    if (curr === '(') {
      return {opens: acc.opens.concat(index), pairs: acc.pairs };
    }
    if (curr === ')') {
      // if there are no more ( then there is no match for this )
      if (acc.opens.length === 0) {
        return acc;
      }

      const matchingOpen = acc.opens[acc.opens.length - 1];
      return {
        opens: acc.opens.slice(0, -1),
        pairs: acc.pairs.concat({open: matchingOpen, close: index}) };
    }
    return acc;
  }, {opens: [], pairs: []});

  //  now that I read the explanation on interview cake, I see that my complicated
  //  data structure was unnecessary.
  // I only need to keep track of the number of (
  // starting from the specified index.

  console.log({opens, pairs});

  // Find the matching close for specified open
  const targetPair = pairs.find(p => p.open === openParenIndex);

  if (targetPair) {
    return targetPair.close;
  }
  return NaN;
}
