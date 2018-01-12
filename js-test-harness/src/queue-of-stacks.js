// https://www.hackerrank.com/challenges/ctci-queue-using-two-stacks/
// This code is correct but is too slow to pass all 
// of the HackerRank test cases

function Queue() {
  this.leftStack = [];
  this.rightStack = [];
}

Queue.prototype.enqueue = function (x) {
  this.leftStack.push(x);
};

Queue.prototype.dequeue = function() {
  // I suspect the problem is that this is too inefficient, doing too many
  // swaps back and forth for large inputs
  const leftLen = this.leftStack.length;

  while (this.leftStack.length > 1) {
    // Pop all of left stack onto right stack
    this.rightStack.push(this.leftStack.pop());
  }
  // pop off the zeroth
  const result = this.leftStack.pop();

  // Push all of left stack back onto right stack
  while (this.rightStack.length > 0) {
    this.leftStack.push(this.rightStack.pop());
  }

  return result;
};

Queue.prototype.peek = function() {
  return this.leftStack[0];
};

Queue.prototype.debug = function() {
  console.log('left: ', this.leftStack.join(','));
  if (this.rightStack.length) {
    console.log('right: ', this.rightStack.join(','));
  }
};

export default Queue;
