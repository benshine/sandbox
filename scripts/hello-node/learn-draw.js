const R = require('ramda')
var termkit = require('terminal-kit')
var term;
const ScreenBuffer = termkit.ScreenBuffer

const isEven = x => x % 2 === 0;
const BOARD_SIZE = 3;

let viewport;
let cursorPos = [0, 0];

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
    // term.grabInput( { mouse: 'button' } ) ;

    term.on('key', handleKeypress);
    term.on( 'mouse' , handleMouseEvent ) ;
    debug( 'ok hello')
    callback(term);
  })
}

// alas, this doesn;t ever fire
const handleMouseEvent = (evName, data) => {
  debug('mouse event: ' + data.x.toString());
}


const debug = (e) => {
  term.moveTo.eraseLine.bgWhite.blue(1, 1, 'msg: ' + e);
}

function handleKeypress (key) {
  switch (key) {
    case 'LEFT' :
      cursorPos[0] = (cursorPos[0] +2) % BOARD_SIZE;
      debug('x now' +       cursorPos[0]);
      break ;
    case 'RIGHT' :
      cursorPos[0] = (cursorPos[0] +1) % BOARD_SIZE;
      debug('x now' +       cursorPos[0]);
      break ;
    case 'UP' :
      debug('got up');
      break ;
    case 'DOWN' :
      debug('got down');
      break ;
    case 'q':
    case 'CTRL_C':
      terminate()
      break

  }
}

function terminate () {
  //term.fullscreen( false ) ;
  term.hideCursor(false)
  term.grabInput(false)

  setTimeout(function () {
    term.moveTo(1, term.height, '\n\n')
    process.exit()
  }, 100)
}

function drawSquare (screenbuffer, {left, top, w, h, bgColor}) {
  R.forEach((row) => {
    R.forEach((col) => {
      screenbuffer.put({
        x: left + col,
        y: top + row,
        attr: {bgColor}
      }, ' ')
    }, R.range(1, w + 1))
  }, R.range(1, h + 1))
}

function checkerboardBgColor (row, col) {
  return isEven(row + col) ? 'blue' : 'darkBlue'
}

function drawGrid (screenbuffer) {
  const SQUARE_WIDTH = 10
  const SQUARE_HEIGHT = 5
  R.forEach((row) => {
    R.forEach((col) => {
      drawSquare(screenbuffer, {
        left: (col * (SQUARE_WIDTH)),
        top: (row * SQUARE_HEIGHT) + 1,
        w: SQUARE_WIDTH,
        h: SQUARE_HEIGHT,
        bgColor: checkerboardBgColor(row, col)
      })
    }, R.range(0, 5))
  }, R.range(0, 5))
}

init((term) => {
  // console.log( 'okay hi'  );

  drawGrid(viewport)
  // drawSquare(viewport,
  //   10,10,10,10)

  viewport.draw()
})
