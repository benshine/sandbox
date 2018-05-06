const R = require('ramda')

const BOARD_SIZE = 3



const indexForGrid = ({row, col}) => 3*row + col;


const playerAtGrid = (state, {row, col}) =>
  state[indexForGrid({row, col})]



let clampWithinBoard = R.clamp(0, BOARD_SIZE - 1)
const moveWithinBoard = (xfn, yfn) =>
  R.compose(
    R.adjust(R.compose(clampWithinBoard, xfn), 0),
    R.adjust(R.compose(clampWithinBoard, yfn), 1)
  )

module.exports = {
  BOARD_SIZE,
  moveWithinBoard,
  playerAtGrid,
}
