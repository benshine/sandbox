const Contacts = require('contacts');

// Only for node
if (process.stdin) {
  process.stdin.resume();
  process.stdin.setEncoding('ascii');
}

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

if (process.stdin) {
  process.stdin.on('data', function (data) {
    input_stdin += data;
  });


  process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
  });


  function readLine() {
    return input_stdin_array[input_currentline++];
  }

  function main() {
  var n = parseInt(readLine());
  const db = new Contacts();
  for (var a0 = 0; a0 < n; a0++) {
    var op_temp = readLine().split(' ');
    var op = op_temp[0];
    var contact = op_temp[1];
    // console.log(`got ${op}, ${contact}`);
    handleContactInput(db, op, contact);
  }
}

}

const handleContactInput = function(db, operation, contact) {
  if (operation === 'add') {
    db.add(contact);
  }
  if (operation === 'find') {
    const count = db.findPartial(contact);
    console.log(count);
  }
};
