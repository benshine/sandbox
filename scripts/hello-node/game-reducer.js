const R = require('ramda');

const createEmptyBoard = () =>
  R.range(0, 9);

const isEven = x => x % 2 === 0;
const createBoardWithMarkers = () =>
  R.range(0, 9).map(R.ifElse(isEven, R.always('a'), R.always('b')));


const createInitialState = () => (
  {
    cursorPos: [0, 0],
    // board: createEmptyBoard()
    board: createBoardWithMarkers()
  }
);

const initialState = createInitialState();

const gameReducer = (prevState = initialState, action) => {
  return prevState;
};

module.exports = {
  reducer: gameReducer
}
