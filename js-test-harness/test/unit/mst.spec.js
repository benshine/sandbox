import mst, { Node } from '../../src/mst.js'

const edges = [
  {u: 1, v: 2, w: 5},
  {u: 1, v: 3, w: 3},
  {u: 4, v: 1, w: 6},
  {u: 2, v: 4, w: 7},
  {u: 3, v: 2, w: 4},
  {u: 3, v: 4, w: 5},
]

describe('MST', () => {
  it('works', () => {
    expect(mst(edges)).to.equal(12)
  })
})
