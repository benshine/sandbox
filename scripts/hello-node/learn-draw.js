const R = require('ramda');
//const term = require('terminal-kit').terminal;
// const ScreenBuffer = require('terminal-kit').ScreenBuffer;



var fs = require( 'fs' ) ;
// var termkit = require( '../lib/termkit.js' ) ;

var termkit = require('terminal-kit')
var term;
var ScreenBuffer = termkit.ScreenBuffer ;



// Buffers
var viewport , sprites = {} ;

function init( callback )
{
  termkit.getDetectedTerminal( function( error , detectedTerm ) {

    if ( error ) { throw new Error( 'Cannot detect terminal.' ) ; }

    term = detectedTerm ;

    viewport = ScreenBuffer.create( {
      dst: term ,
      width: Math.min( term.width ) ,
      height: Math.min( term.height - 1 ) ,
      y: 2
    } ) ;

    term.fullscreen() ;
    term.moveTo.eraseLine.bgWhite.green( 1 , 1 , 'Q/Ctrl-C: Quit\n' ) ;
    term.hideCursor() ;
     term.grabInput() ;
    term.on( 'key' , inputs ) ;
    callback(
      term
    ) ;
  } ) ;
}


function inputs( key )
{
  switch ( key )
  {
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
      terminate() ;
      break ;

  }
}


function terminate()
{
  //term.fullscreen( false ) ;
  term.hideCursor( false ) ;
  term.grabInput( false ) ;

  setTimeout( function() {
    term.moveTo( 1 , term.height , '\n\n' ) ;
    process.exit() ;
  } , 100 ) ;
}

function drawSquare (screenbuffer, {left, top, w, h, bgColor}) {
  R.forEach((row) => {
    R.forEach((col) => {
      screenbuffer.put({
        x: left + col,
        y: top + row,
        attr: { bgColor }
      }, ' ')
    }, R.range(1, h))
  }, R.range(1, w))
}



function drawGrid(screenbuffer) {
  const SQUARE_SIZE = 10;
  R.forEach((row) => {
    R.forEach((col) => {
      drawSquare(screenbuffer, {
        left: (col * SQUARE_SIZE) + 1,
        top: (row * SQUARE_SIZE) + 1,
        w: SQUARE_SIZE,
        h: SQUARE_SIZE,
        bgColor: 'blue'
      })
    }, R.range(0, 3))
  }, R.range(0, 3))
}

init((term) => {
  // console.log( 'okay hi'  );

  drawGrid(viewport)
  // drawSquare(viewport,
  //   10,10,10,10)

  viewport.draw()
});
