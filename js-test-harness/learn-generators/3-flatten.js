// This solution works, but doesn't have a generator
// really yielding to a generator. I used reduce,
// and we can't yield* from anything except a generator.
// So, not quite what the tutorial author intended.
function *flat (arr) {
  const result = arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc.concat(...flat(cur));
    } else {
      return acc.concat(cur);
    }
  }, []);
  yield* result;
}

const A = [1, [2, [3, 4], 5], 6];
for (const f of flat(A)) {
  console.log( f );
}
// 1 2 3 4 5 6
