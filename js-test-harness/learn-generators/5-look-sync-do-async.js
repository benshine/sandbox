var fs = require('fs');

function l(stuff) {
  console.log(stuff);
}

function run (generator) {
  var it = generator(go);
  function go (err, result) {
    if (err) {
      return it.throw(err);
    }
    it.next(result);
  }

  go();
}

// we are calling run and passing it a fn which is a generator
run(function* (done) {
  try {
    var dirFiles = yield fs.readdir('NoNoNoNo', done); // No such dir
    var firstFile = dirFiles[0]; // TypeError: Cannot read property '0' of undefined
    console.log(firstFile);
  } catch (e) {
    l(null);
  }
});
