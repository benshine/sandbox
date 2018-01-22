
const byWeight = (a,b) => {
  if (a.w < b.w) {
    return -1
  } else if (a.w > b.w ) {
    return 1
  } else {
    return (a.u + a.v + a.w) < (b.u + b.v + b.w) ? -1 : 1
  }
}

const getComponents = (edges) => edges.reduce((acc, edge) => {
  acc[edge.u] = [edge.u]
  acc[edge.v] = [edge.v]
  return acc
}, {})

const sameComponent = (components, u, v) => {
  return components[u].includes(v)
}

const trueMST = (edges) => {
  const sorted = edges.sort(byWeight)
  const initComponents = getComponents(sorted)

  const build = sorted.reduce((acc, edge) => {
    const { u, v } = edge
    if (!sameComponent(acc.components, u, v)) {
      acc.components[u].push(v)
      acc.components[v] = acc.components[u]  // <--- what it needed to be
      // acc.components[v].push(u)  // <--- what we had
      acc.tree = acc.tree.concat(edge)
    }
    return acc
  }, { components: initComponents, tree: [] })

  return build.tree.reduce((a,b) => a + b.w, 0)
}

const mst = (n, edges) => {
  const annotated = edges.map(edge => {
    const [u, v, w] = edge
    return { u, v, w }
  })
  return trueMST(annotated)
}

export default trueMST
