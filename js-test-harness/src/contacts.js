function Contacts() {
   // this.data uses built-in javascript types
  this.data = new Set();
  this.trie = new Node(null); // special char meaning beginning
}

const TERMINATOR = '.';

function Node(char) {
  this.char = char;
  this.children = new Map();
  this.numLeaves = 0;
  this.leaves = [];
  this.DEBUG = true;
}

Node.prototype.getOrCreateChild = function(char) {
  // If we already have a child matching this return it
  // Else, create a child matching this and return it
  let child = this.children.get(char);
  if (!child) {
    child = new Node(char);
    this.children.set(char, child);
  }
  return child;
};

Node.prototype.getChild = function(char) {
  return this.children.get(char);
};

Node.prototype.hasChildren = function() {
  return !!this.children.size;
};

Node.prototype.isTerminator = function() {
  return this.char === TERMINATOR;
};

Node.prototype.countLeaves = function() {
  let count = 0;
  if (this.isTerminator()) {
    return 1;
  }

  for (const [char, node] of this.children) {
    count += node.countLeaves();
  }

  return count;
};

Node.prototype.addLeaf = function(name) {
  this.numLeaves = this.numLeaves + 1;
  if (this.DEBUG) {
    this.leaves.push(name);
  }
};


Node.prototype.debug = function() {
  if (this.DEBUG) {
    console.log(this.leaves.join(', '));
  }
}

Contacts.prototype.addOne = function(name) {
  // add to both trie and built-in set
  this.data.add(name);

  let cur = this.trie;
  for (const c of name) {
    // if the node has a child matching 'next' then return it,
    // else add it
    cur = cur.getOrCreateChild(c);
    cur.addLeaf(name);
  }
  // Add a terminator
  cur.getOrCreateChild(TERMINATOR);
};

Contacts.prototype.add = function(...names) {
  for (const name of names) {
    this.addOne(name);
  }
};

Contacts.prototype.findPartial = function(partial) {
  let cur = this.trie;
  let count = 0;


  for (const c of partial) {
    cur = cur.getChild(c);

    if (!cur) {
      // There is no child matching this letter,
      // so we have no matches
      break;
    }
  }

  if (cur) {
    cur.debug();
    return cur.numLeaves;
  } else {
    return 0;
  }

};

Contacts.prototype.contents = function(useTrie = true) {
  if (useTrie) {
    return []; // unimplemented
  } else {
    return Array.from(this.data.keys());
  }

};


const handleContactInput = function(db, operation, contact) {
  if (operation === 'add') {
    db.add(contact);
  }
  if (operation === 'find') {
    const count = db.findPartial(contact);
    console.log(count);
  }
};


// This is just for hacker rank
function main() {
  var n = parseInt(readLine());
  const db = new Contacts();
  for (var a0 = 0; a0 < n; a0++) {
    var op_temp = readLine().split(' ');
    var op = op_temp[0];
    var contact = op_temp[1];
    handleContactInput(db, op, contact);
  }
}


// This is only used for hackerrank online
if (process.stdin) {
  process.stdin.resume();
  process.stdin.setEncoding('ascii');

  var input_stdin = "";
  var input_stdin_array = "";
  var input_currentline = 0;

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
}

// Here are the actual exports, which we need for local testing
export default Contacts;
