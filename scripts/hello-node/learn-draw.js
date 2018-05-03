const R = require('ramda')
var termkit = require('terminal-kit')
var term
const ScreenBuffer = termkit.ScreenBuffer

const isEven = x => x % 2 === 0

// Buffers
let viewport

function init (callback) {
  termkit.getDetectedTerminal(function (error, detectedTerm) {

    if (error) { throw new Error('Cannot detect terminal.') }

    term = detectedTerm

    viewport = ScreenBuffer.create({
      dst: term,
      width: Math.min(term.width),
      height: Math.min(term.height - 1),
      y: 2
    })

    term.fullscreen()
    term.moveTo.eraseLine.bgWhite.green(1, 1, 'Q/Ctrl-C: Quit\n')
    term.hideCursor()
    term.grabInput()
    term.on('key', inputs)
    callback(
      term
    )
  })
}

function inputs (key) {
  switch (key) {
    // case 'UP' :
    //   sprites.spaceship.y -- ;
    //   break ;
    // case 'DOWN' :
    //   sprites.spaceship.y ++ ;
    //   break ;
    // case 'LEFT' :
    //   sprites.spaceship.x -- ;
    //   break ;
    // case 'RIGHT' :
    //   sprites.spaceship.x ++ ;
    //   break ;
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
