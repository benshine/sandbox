const R = require('ramda');
const isEven = x => x % 2 === 0;
const BOARD_SIZE = 3;

function checkerboardBgColor (row, col) {
  return isEven(row + col) ? 'blue' : 'darkBlue'
}


let clampWithinBoard = R.clamp(0, BOARD_SIZE - 1);
const moveWithinBoard = (xfn, yfn) =>
  R.compose(
    R.adjust(R.compose(clampWithinBoard, xfn), 0),
    R.adjust(R.compose(clampWithinBoard, yfn), 1)
  )

module.exports = {
  BOARD_SIZE,
  checkerboardBgColor,
  moveWithinBoard
}
