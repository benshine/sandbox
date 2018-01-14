function *upper (items) {
  for (const el of items) {
    // This code uses exception handling since that is the
    // point of the exercise. Better would be to check that
    // touppercase is a function.
      try {
      yield el.toUpperCase();
    } catch (e) {
      yield null;
    }
  }
}

var bad_items = ['a', 'B', 1, 'c'];

for (const item of upper(bad_items)) {
  console.log(item);
}
