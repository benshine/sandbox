const R = require('ramda')

const isEven = x => x % 2 === 0
const BOARD_SIZE = 3

const createEmptyBoard = () =>
  R.range(0, 9).map(() => ({a: false, b: false}))

let createState = () => (
  {
    cursorPos: [0, 0],
    board: createEmptyBoard()
  }
)

function checkerboardBgColor (row, col) {
  return isEven(row + col) ? 'blue' : 'darkBlue'
}

let clampWithinBoard = R.clamp(0, BOARD_SIZE - 1)
const moveWithinBoard = (xfn, yfn) =>
  R.compose(
    R.adjust(R.compose(clampWithinBoard, xfn), 0),
    R.adjust(R.compose(clampWithinBoard, yfn), 1)
  )

module.exports = {
  BOARD_SIZE,
  checkerboardBgColor,
  moveWithinBoard,
  createState
}
