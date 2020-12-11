import * as React from 'react'
import { EdgesInfo, VerticesContext, VerticesInfo } from '../../types/Types'
import Vertex from './vertex/Vertex'

const SCALE_FACTOR = [85, 150]
const TRANS_FACTOR = [50, 50]

type Props = {
  vertices: VerticesInfo,
  edges: EdgesInfo,
  verticesContext: VerticesContext,
  time: number
}

const getBottomRightCoords = (nodes: VerticesInfo) => {
  const raw = Object.entries(nodes).map(([k, v]) => v).reduce(
    (acc, cur) => {
      return [Math.max(cur.coords[0], acc[0]), Math.max(cur.coords[1], acc[1])]
    }, [-1, -1]
  )
  return [raw[0] * SCALE_FACTOR[0] + 2 * TRANS_FACTOR[0],
    raw[1] * SCALE_FACTOR[1] + 2 * TRANS_FACTOR[1]]
}

const nodes = (nodes: VerticesInfo, context: VerticesContext) => {
  console.log(getBottomRightCoords(nodes))
  return (
    <>
      { Object.entries(nodes).map(([k, v]) => {
        return <Vertex key={v.id} center={[v.coords[0] * SCALE_FACTOR[0] + TRANS_FACTOR[0], v.coords[1] * SCALE_FACTOR[1] + TRANS_FACTOR[1]]} />
      })}
    </>
  )
}

const TreeViewer = ({
  vertices,
  edges,
  verticesContext,
  time
} : Props) => {
  const bottomRight = getBottomRightCoords(vertices)
  return (
    <svg width="100%" height="100vh" viewBox={`0 0 ${bottomRight[0]} ${bottomRight[1]}`}
    >
       { nodes(vertices, verticesContext) }
    </svg>
  )
}

export default TreeViewer
