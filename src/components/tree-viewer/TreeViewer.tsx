import React, { useState } from 'react'
import {
  Box
} from '@chakra-ui/react'
import { EdgesInfo, VerticesContext, VerticesInfo } from '../../types/Types'
import Vertex from './vertex/Vertex'
import ProgressControl from './progress/ProgressControl'

const SCALE_FACTOR = [85, 150]
const TRANS_FACTOR = [50, 50]

type Props = {
  vertices: VerticesInfo,
  edges: EdgesInfo,
  verticesContext: VerticesContext,
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

const getEndTime = (nodes: VerticesInfo) => {
  return Object.entries(nodes).map(([k, v]) => v).reduce(
    (acc, cur) => {
      return Math.max(cur.highlightAt[cur.highlightAt.length - 1], acc)
    }, 0
  )
}

const nodes = (nodes: VerticesInfo, context: VerticesContext, time) => {
  return (
    <>
      { Object.entries(nodes).map(([k, v]) => {
        return v.appearFrom <= time &&
        <Vertex key={v.id}
                center={[v.coords[0] * SCALE_FACTOR[0] + TRANS_FACTOR[0], v.coords[1] * SCALE_FACTOR[1] + TRANS_FACTOR[1]]}
                highlight={v.highlightAt.includes(time) ? 'current' : 'normal'}
                label={context[v.id].args.join(', ')}
        />
      })}
    </>
  )
}

const TreeViewer = ({
  vertices,
  edges,
  verticesContext
} : Props) => {
  const [time, setTime] = useState(0)

  const bottomRight = getBottomRightCoords(vertices)
  const endTime = getEndTime(vertices)

  return (
    <Box width="100%" height="100%">
      <Box width="100%" height="calc(100% - 2.5rem)" backgroundColor="">
        <svg height="100%" width="100%" viewBox={`0 0 ${bottomRight[0]} ${bottomRight[1]}`}>
          { nodes(vertices, verticesContext, time) }
        </svg>
      </Box>
      <Box width="100%" height="2.5rem">
        <ProgressControl time={time} endTime={endTime} onTimeChange={(time) => setTime(time) } />
      </Box>
    </Box>
  )
}

export default TreeViewer
