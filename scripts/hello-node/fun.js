const R = require('ramda');
const term = require('terminal-kit').terminal;
const ScreenBuffer = require('terminal-kit').ScreenBuffer;
const isEven = x => x % 2 === 0


term.clear();

function squareAt(fn, left, top, w, h) {
  term.moveTo(left, top);
  R.forEach((row) => {
    term.down(1)
    // term.moveTo(left, top + row );
    // fn(row);
    R.forEach((col) => {
      // term.moveTo(left + col, top + row);
      term.left(1)
      fn(col)
    },R.range(1, h) )
  }, R.range(1, w))
  // term.moveTo(x, y);
  // fn(x)
}
// R.forEach( (row) => {
//   R.forEach((col) => {
//     term.moveTo(row, col);
//     term.bgBrightBlue(col);
//   }, [1,2,3,4]);
//   term('\n')
// }, [1,2,3,4])


// squareAt(term.bgMagenta, 40, 10, 10, 8);
//
// const sb = ScreenBuffer.create({dst: term, width: 80, height: 80});
// sb.fill('*')
// sb.put('hm', 'whatnnn')
//
// sb.draw()



term.cyan( 'Choose a file:\n' ) ;

var items = R.range(1,22).map(n => n.toString())

term.gridMenu( items , function( error , response ) {
  term( '\n' ).eraseLineAfter.green(
    "#%s selected: %s (%s,%s)\n" ,
    response.selectedIndex ,
    response.selectedText ,
    response.x ,
    response.y
  ) ;
  process.exit() ;
} ) ;
