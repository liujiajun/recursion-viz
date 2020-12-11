import { EdgesInfo, TreeNode, VerticesInfo } from '../../types/Types'

export default function drawTimedTree (root: TreeNode): [VerticesInfo, EdgesInfo] {
  const verticesInfo: VerticesInfo = {}
  const edgesInfo: EdgesInfo = {}
  const time = { curTime: 0 }
  drawTimedTreehelper(root, verticesInfo, edgesInfo, time)
  return [verticesInfo, edgesInfo]
}

function drawTimedTreehelper (root: TreeNode, vertices: VerticesInfo, edges: EdgesInfo, time: {curTime: number}) {
  vertices[root.id] = {
    id: root.id,
    coords: [root.x, root.y],
    appearFrom: time.curTime,
    highlightAt: [time.curTime],
    label: root.id.toString()
  }

  // Do not show edges for leaves.
  if (root.children.length === 0) {
    return
  }

  for (const child of root.children) {
    time.curTime++
    // show forward edge
    edges[JSON.stringify([root.id, child.id])] = {
      u: root.id,
      v: child.id,
      interval: [time.curTime, Infinity],
      label: ''
    }

    time.curTime++
    drawTimedTreehelper(child, vertices, edges, time)

    time.curTime++
    // show backward edge
    edges[JSON.stringify([child.id, root.id])] = {
      u: child.id,
      v: root.id,
      interval: [time.curTime, Infinity],
      label: ''
    }
    // also remove the previous forward edge
    edges[JSON.stringify([root.id, child.id])].interval[1] = time.curTime

    time.curTime++
    // highlight backtrack ended
    vertices[root.id].highlightAt.push(time.curTime)
  }
}
