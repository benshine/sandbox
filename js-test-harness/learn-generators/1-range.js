// Exercise 1 from https://github.com/isRuslan/learn-generators

function *range(from, to) {
  if (to <= from) {
    throw new Error("Sorry, toy implementation. Increasing only!");
  }

  let i = from;
  while (i <= to) {
    yield i++;
  }
}

// This is the test code provided by learn-generators
 for (const r of range(5, 10)) {
   console.log( r );
 }
