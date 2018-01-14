// I don't understand the control flow here yet.
// Reference solution: https://github.com/isRuslan/learn-generators/blob/master/exercises/look_sync_make_promise/solution/solution.js


function askFoo () {
  return new Promise(function (resolve, reject) {
    console.log('in askFoo');
    resolve('foo');
  });
}

function run (generator) {
  const iter = generator();

  function go(result) {
    if (result.done) {
      return result.value;
    }
  }

}

run(function* () {
  // improve: errors?
  var foo = yield askFoo();
  console.log(foo);
});
