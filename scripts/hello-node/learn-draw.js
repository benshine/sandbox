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



init((term) => {
  // console.log( 'okay hi'  );
  term('omg hi');

  viewport.draw()
});
