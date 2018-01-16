// based on https://github.com/PacktPublishing/Mastering-JavaScript-Functional-Programming


const onceOrig = f => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            f(...args);
        }
    };
};


// without adding a local variable
const once = f => {
  console.log('mf ooooooorbme');
    return (...args) => {
      f(...args);
      f = () => {};
    };
};

const nTimesDo = (count, f) => {
  return (...args) => {
    while (count > 0) {
      f(...args);
      count--;
    }
  };
};

const upToNTimes = (count, f) => {
  return (...args) => {
    if (count > 0) {
      f(...args);
      count--;
    }
  };
};


const onceAndAfter = (f, g = noop) => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            f(...args);
        } else {
            g(...args);
        }
    };
};
