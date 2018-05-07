const R = require('ramda')
const GameActions = require('./actions')
const indexForGrid = require('./game').indexForGrid
const BOARD_SIZE = 3

const createEmptyBoard = () =>
  R.range(0, BOARD_SIZE * BOARD_SIZE)

const isEven = x => x % 2 === 0

const createBoardWithMarkers = () =>
  R.range(0, BOARD_SIZE * BOARD_SIZE)
    .map(R.ifElse(isEven, R.always('a'), R.always('b')))

const createInitialState = () => ({
  cursorPos: [0, 0],
  board: createEmptyBoard()
  // board: createBoardWithMarkers()
})


const playerAtGrid = (state, {row, col}) =>
  state[indexForGrid({row, col})]


const initialState = createInitialState()

let clampWithinBoard = R.clamp(0, BOARD_SIZE - 1)
const moveWithinBoard = (xfn, yfn) =>
  R.compose(
    R.adjust(R.compose(clampWithinBoard, xfn), 0),
    R.adjust(R.compose(clampWithinBoard, yfn), 1)
  )

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GameActions.MOVE_CURSOR:
      return Object.assign({}, state, {
        cursorPos: moveWithinBoard(action.xfn, action.yfn)(state.cursorPos)
      });

    case GameActions.CLAIM_SQUARE:
      const [col, row] = state.cursorPos;
      return Object.assign({}, state, {
        board: R.update(indexForGrid({row, col}), 'a', state.board)
      });
    default:
      return state
  }
}

module.exports = {
  reducer: gameReducer
}
