const R = require('ramda')
const MOVE_CURSOR = 'MOVE_CURSOR'
const CLAIM_SQUARE = 'CLAIM_SQUARE'

const moveCursor = ({xfn = R.identity, yfn = R.identity}) => {
  return {
    type: MOVE_CURSOR,
    xfn,
    yfn
  }
}

const claimSquare = () => ({
  type: CLAIM_SQUARE
})

module.exports = {
  MOVE_CURSOR, CLAIM_SQUARE,
  moveCursor,
  claimSquare
}
