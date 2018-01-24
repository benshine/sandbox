import { invertBy, identity } from 'lodash/fp'

export const INIT_GROUP = { vertices: {}, components: {} }

export const addVertex = (id, { vertices, components }) => ({
  vertices: Object.assign({}, vertices, { [id]: id }),
  components: Object.assign({}, components, { [id]: [id] })
})

export const addEdge = ({ u, v }, group) => addVertex(v, addVertex(u, group))

export const combineComponents = (to, from, { vertices, components }) => {
  const v = components[from].reduce((acc, vertex) => {
    acc[vertex] = to
    return acc
  }, vertices)
  const c = invertBy(identity, vertices)
  return { vertices: v, components: c }
}

export const componentsForEdge = ({u, v}, group) =>
  [ group.vertices[u], group.vertices[v] ]

export const sameComponent = ({u, v}, { vertices }) =>
  vertices[u] === vertices[v]

const byWeight = (a,b) => {
  if (a.w < b.w) {
    return -1
  } else if (a.w > b.w ) {
    return 1
  } else {
    return (a.u + a.v + a.w) < (b.u + b.v + b.w) ? -1 : 1
  }
}

const trueMST = unsortedEdges => {
  const edges = unsortedEdges.sort(byWeight)
  const group = edges.reduce((acc, edge) => addEdge(edge, acc), INIT_GROUP)
  const build = edges.reduce((acc, edge) => {
    const [ c1, c2 ] = componentsForEdge(edge, acc.group)
    if (!sameComponent(edge, acc.group)) {
      acc.group = combineComponents(c1, c2, acc.group)
      acc.tree = acc.tree.concat(edge)
    }
    return acc
  }, { group, tree: [] })
  return build.tree.reduce((a, b) => a + b.w, 0)
}

// --- For hacker rank
export const annotateEdges = (edges) =>
  edges.map(edge => {
    const [u, v, w] = edge
    return { u, v, w }
  })

const mst = (n, edges) => {
  return trueMST(annotateEdges(edges))
}

export default trueMST
