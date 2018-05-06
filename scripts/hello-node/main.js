const R = require('ramda');
const termkit = require('terminal-kit');
let term;
const ScreenBuffer = termkit.ScreenBuffer;

const Redux = require('redux');
const { createStore, applyMiddleware, combineReducers } = Redux;
const reducer = require('./game-reducer').reducer;


const Game = require('./game');
let state = Game.createState();
let viewport;

const store = createStore(reducer);

function init (callback) {
  termkit.getDetectedTerminal(function (error, detectedTerm) {

    if (error) { throw new Error('Cannot detect terminal.') }

    term = detectedTerm;

    viewport = ScreenBuffer.create({
      dst: term,
      width: Math.min(term.width),
      height: Math.min(term.height - 1),
      y: 2
    });

    term.fullscreen()
    term.moveTo.eraseLine.bgWhite.green(1, 1, 'Q/Ctrl-C: Quit\n')
    term.hideCursor()
    term.grabInput()

    term.on('key', handleKeypress);
    debug( 'use arrow keys to move, q to quit');
    callback(term)
  })
}

const debug = (e) => {
  term.moveTo.eraseLine.bgWhite.blue(1, 1, 'msg: ' + e);
}

function handleKeypress (key) {
  let changeFn;
  switch (key) {
    case 'LEFT' :
      changeFn = Game.moveWithinBoard(R.dec, R.identity)
      break
    case 'RIGHT' :
      changeFn = Game.moveWithinBoard(R.inc, R.identity)
      break
    case 'UP' :
      changeFn = Game.moveWithinBoard(R.identity, R.dec)
      break
    case 'DOWN' :
      changeFn = Game.moveWithinBoard(R.identity, R.inc)
      break
    case 'q':
    case 'CTRL_C':
      terminate();
      break;
  }

  if (changeFn) {
    state.cursorPos = changeFn(state.cursorPos);
    drawGrid(viewport);
    viewport.draw();
  }
}

function terminate () {
  term.hideCursor(false);
  term.grabInput(false);

  setTimeout(function () {
    term.moveTo(1, term.height, '\n\n');
    process.exit();
  }, 100);
}

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

function drawPlayerMarker(whichPlayer, {left, top, w, h, bgColor} ) {
  drawSquare(viewport, {left, top, w, h, bgColor, char: whichPlayer});
}


function drawGrid (screenbuffer) {
  const SQUARE_WIDTH = 10;
  const SQUARE_HEIGHT = 5;
  const w = SQUARE_WIDTH;
  const h = SQUARE_HEIGHT;

  R.forEach((row) => {
    R.forEach((col) => {
      const bgColor = Game.checkerboardBgColor(row, col);

      const left = (col * (SQUARE_WIDTH));
      const top = (row * SQUARE_HEIGHT) + 1;
      drawSquare(screenbuffer, {
        left, top, w, h,
        bgColor
      });

      if (R.equals(state.cursorPos,[col, row])) {
        drawCursor(screenbuffer, {left, top, w, h, bgColor});
      }

      drawPlayerMarker(
        Game.playerAtGrid(state.board, {row,col}),
        {left, top, w: w/2, h: h/2}
        );

    }, R.range(0, Game.BOARD_SIZE));
  }, R.range(0, Game.BOARD_SIZE));
}

init(() => {
  drawGrid(viewport);
  viewport.draw();
})
