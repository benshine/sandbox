const R = require('ramda');
const termkit = require('terminal-kit');
let term;
const ScreenBuffer = termkit.ScreenBuffer;

const isEven = x => x % 2 === 0;
const BOARD_SIZE = 3;
const createEmptyBoard = () => R.range(0,9).map(()=> ({a: false, b: false}));

let state = {
  cursorPos: [0, 0],
  board: createEmptyBoard()
}

let viewport;

let clampWithinBoard = R.clamp(0, BOARD_SIZE - 1);
let moveWithinBoard = (xfn, yfn) =>
  R.compose(
    R.adjust(R.compose(clampWithinBoard, xfn), 0),
    R.adjust(R.compose(clampWithinBoard, yfn), 1)
  )

  function init (callback) {
  termkit.getDetectedTerminal(function (error, detectedTerm) {

    if (error) { throw new Error('Cannot detect terminal.') }

    term = detectedTerm

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
  let changeFn
  switch (key) {
    case 'LEFT' :
      changeFn = moveWithinBoard(R.dec, R.identity)
      break
    case 'RIGHT' :
      changeFn = moveWithinBoard(R.inc, R.identity)
      break
    case 'UP' :
      changeFn = moveWithinBoard(R.identity, R.dec)
      break
    case 'DOWN' :
      changeFn = moveWithinBoard(R.identity, R.inc)
      break
    case 'q':
    case 'CTRL_C':
      terminate();
      break;
  }

  state.cursorPos = changeFn(state.cursorPos);
  drawGrid(viewport);
  viewport.draw();
}

function terminate () {
  term.hideCursor(false);
  term.grabInput(false);

  setTimeout(function () {
    term.moveTo(1, term.height, '\n\n');
    process.exit();
  }, 100);
}

function drawSquare (screenbuffer, {left, top, w, h, bgColor, extraDrawFn}) {
  R.forEach((row) => {
    R.forEach((col) => {
      screenbuffer.put({
        x: left + col,
        y: top + row,
        attr: {bgColor}
      }, ' ');
    }, R.range(1, w + 1));
  }, R.range(1, h + 1));
  if (extraDrawFn) extraDrawFn(screenbuffer, {left, top, w, h, bgColor});
}

function checkerboardBgColor (row, col) {
  return isEven(row + col) ? 'blue' : 'darkBlue'
}

function drawCursor(screenbuffer, {left, top, w, h, bgColor}) {
  debug(`drawCursor ${left}`);
  R.forEach((row) => {
    R.forEach((col) => {
      screenbuffer.put({
        x: left + col,
        y: top + row,
        attr: {bgColor},
      }, '*')
    }, R.range(1, w + 1));
  }, R.range(1, h + 1));

}

function drawGrid (screenbuffer) {
  const SQUARE_WIDTH = 10;
  const SQUARE_HEIGHT = 5;
  // i need to use a partail here to get the outside pamas passed in to drawCursor
  // const extraDrawFn = R.cond([
  //   [R.equals(cursorPos),  drawCursor],
  //   [R.T, temp => () => 'nope']
  //     ]);
  R.forEach((row) => {
    R.forEach((col) => {
      const extraDrawFn = (col === state.cursorPos[0] && row === state.cursorPos[1]) ? drawCursor : false;
      drawSquare(screenbuffer, {
        left: (col * (SQUARE_WIDTH)),
        top: (row * SQUARE_HEIGHT) + 1,
        w: SQUARE_WIDTH,
        h: SQUARE_HEIGHT,
        bgColor: checkerboardBgColor(row, col),
        extraDrawFn: extraDrawFn // ([row, col])
      });
    }, R.range(0, BOARD_SIZE));
  }, R.range(0, BOARD_SIZE));
}

init(() => {
  drawGrid(viewport);
  viewport.draw();
})
