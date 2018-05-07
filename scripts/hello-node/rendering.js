const R = require('ramda');
const playerAtGrid = require('./game').playerAtGrid;
const isEven = x => x % 2 === 0;

function drawSquare (screenbuffer, {row, col, left, top, w, h, bgColor, char = ' '}) {
  R.forEach((x) => {
    R.forEach((y) => {
      screenbuffer.put({
        x: left + x,
        y: top + y,
        attr: {bgColor}
      }, char);
    }, R.range(1, h + 1));
  }, R.range(1, w + 1));
}


function drawCursor(screenbuffer, {left, top, w, h, bgColor}) {
  drawSquare(screenbuffer, {left, top, w, h, bgColor, char: '+'});
}

function drawPlayerMarker(screenbuffer, whichPlayer,
                          {left, top, w, h, bgColor} ) {
  const drawFn = R.equals(whichPlayer, 'a') ? drawPlayerA : drawPlayerB;
  drawFn(screenbuffer, {left, top, w, h, bgColor, char: whichPlayer});
}

// Player A is drawn as O.
function drawPlayerA(screenbuffer, {left, top, w, h, bgColor}) {
  screenbuffer.put({
    x: left + 2,
    y: top + 2,
    direction: 'down',
    attr: {bgColor}
  }, '/||');
  screenbuffer.put({
    x: left + 8,
    y: top + 2,
    direction: 'down',
    attr: {bgColor}
  }, '\\||');
  screenbuffer.put({
    x: left + 3,
    y: top + 2,
    direction: 'right',
    attr: {bgColor}
  }, '-----');
  screenbuffer.put({
    x: left + 2,
    y: top + 5,
    direction: 'right',
    attr: {bgColor}
  }, '\\-----/');


}// Player B is drawn as X.
function drawPlayerB(screenbuffer, {left, top, w, h, bgColor}) {
  screenbuffer.put({
    x: left + 3,
    y: top + 2,
    dx: 1,
    dy: 1,
    attr: {bgColor}
  }, '\\\\\\');
  screenbuffer.put({
    x: left + 5,
    y: top + 2,
    dx: -1,
    dy: 1,
    attr: {bgColor}
  }, '///');
}

function checkerboardBgColor (row, col) {
  return isEven(row + col) ? 'blue' : 'darkBlue'
}

function drawGrid (screenbuffer, store, boardSize = 3) {
  const SQUARE_WIDTH = 10;
  const SQUARE_HEIGHT = 5;
  const w = SQUARE_WIDTH;
  const h = SQUARE_HEIGHT;
  const {cursorPos, board} = store.getState();

  R.forEach((row) => {
    R.forEach((col) => {
      const bgColor = checkerboardBgColor(row, col);

      const left = (col * (SQUARE_WIDTH));
      const top = (row * SQUARE_HEIGHT) + 1;
      drawSquare(screenbuffer, {
        left, top, w, h,
        bgColor
      });

      if (R.equals(cursorPos,[col, row])) {
        drawCursor(screenbuffer, {left, top, w, h, bgColor});
      }

      drawPlayerMarker(
        screenbuffer,
        playerAtGrid(board, {row,col}),
        {left, top, w: w/2, h: h/2}
      );

    }, R.range(0, boardSize));
  }, R.range(0, boardSize));
}


module.exports = {
  drawSquare,
  drawCursor,
  drawGrid
};
