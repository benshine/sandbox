const R = require('ramda')




const indexForGrid = ({row, col}) => 3*row + col;


const playerAtGrid = (state, {row, col}) =>
  state[indexForGrid({row, col})]


module.exports = {
  playerAtGrid,
  indexForGrid
}
