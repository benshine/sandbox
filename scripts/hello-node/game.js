const R = require('ramda')

const isEven = x => x % 2 === 0
const BOARD_SIZE = 3

const createEmptyBoard = () =>
  R.range(0, 9)

const createBoardWithMarkers = () =>
  R.range(0, 9).map(R.ifElse(isEven, R.always('a'), R.always('b')))

let createState = () => (
  {
    cursorPos: [0, 0],
    // board: createEmptyBoard()
    board: createBoardWithMarkers()
  }
);

const indexForGrid = ({row, col}) => 3*row + col;


const playerAtGrid = (state, {row, col}) =>
  state[indexForGrid({row, col})]

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
  playerAtGrid,
  createState
}
