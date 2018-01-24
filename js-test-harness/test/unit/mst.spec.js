import mst, {
  annotateEdges,
  addVertex,
  addEdge,
  combineComponents
} from '../../src/mst.js'

import testCaseFive from '../data/mst/testCaseFive'

describe('MST addVertex', () => {
  it('adds a vertex and component', () => {
    const init = { vertices: {}, components: {} }
    const expected = {vertices: { 1: 1 }, components: { 1: [1] }}
    const actual = addVertex(1, init)
    expect(actual).to.deep.equal(expected)
  })
})

describe('MST addEdge', () => {
  it('adds a vertex and component', () => {
    const init = { vertices: {}, components: {} }
    const expected = {vertices: { 1: 1, 2: 2 }, components: { 1: [1], 2: [2] }}
    const actual = addEdge({u: 1, v: 2}, init)
    expect(actual).to.deep.equal(expected)
  })
})

describe('MST combineComponents', () => {
  it('combines components', () => {
    const init = {
      vertices: { 1: 'a', 2: 'b' },
      components: { a: [ '1' ], b: [ '2' ] }
    }
    const expected = {
      vertices: { 1: 'a', 2: 'a' },
      components: { a: [ '1', '2' ], }
    }
    const actual = combineComponents('a', 'b', init)
    console.log('actual', actual)

    expect(actual).to.deep.equal(expected)
  })
})

describe('MST', () => {
  it('passes test case #0', () => {
    const edges = [
      {u: 1, v: 2, w: 5},
      {u: 1, v: 3, w: 3},
      {u: 4, v: 1, w: 6},
      {u: 2, v: 4, w: 7},
      {u: 3, v: 2, w: 4},
      {u: 3, v: 4, w: 5},
    ]
    expect(mst(edges)).to.equal(12)
  })

  it('passes test case #2', () => {
    const edges = [
      [1, 2, 1],
      [3, 2, 150],
      [4, 3, 99],
      [1, 4, 100],
      [3, 1, 200],
    ]
    expect(mst(annotateEdges(edges))).to.equal(200)
  })

  // it('passes test case #5', () => {
  //   const edges = testCaseFive.split('\n')
  //     .map(row => row.split(' ').map(d => parseInt(d)))
  //   expect(mst(annotateEdges(edges))).to.equal(6359060)
  // })
})
